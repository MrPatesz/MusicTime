import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import AlbumSongComponent from "../Components/SongComponents/AlbumSongComponent";
import NewAlbumComponent from "../Components/NewAlbumComponent";
import NewSongComponent from "../Components/SongComponents/NewSongComponent";
import DetailedSongDto from "../Models/DetailedSongDto";
import { useDispatch } from "react-redux";
import { setQueue, addToHistory } from "../redux/player";
import { Config } from "../config";
import useAlbum from "../Hooks/Queries/AlbumQueries/useAlbum";
import useAlbumsSongs from "../Hooks/Queries/AlbumQueries/useAlbumsSongs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QueryComponent from "../Components/QueryComponent";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import useUpdateSong from "../Hooks/Mutations/SongMutations/useUpdateSong";

function AlbumDetailsPage() {
  const dispatch = useDispatch();

  let id = useRouteMatch("/albums/:id").params.id;

  const {
    data: album,
    error: albumError,
    isFetching: isAlbumFetching,
  } = useAlbum(id);

  const {
    data: songs,
    error: songsError,
    isFetching: areSongsFetching,
  } = useAlbumsSongs(id);

  const updateSong = useUpdateSong();

  const [showEditAlbum, setShowEditAlbum] = useState<boolean>(false);
  const [showAddSong, setShowAddSong] = useState<boolean>(false);

  function playFunction() {
    if (!(songs && album)) return;

    let queue: DetailedSongDto[] = [];

    songs.forEach((s) =>
      queue.push(
        new DetailedSongDto(s.id, s.title, s.url, 0, "", id, album.title)
      )
    );

    dispatch(setQueue(queue));
    dispatch(addToHistory({ id: id, type: "album" }));
  }

  const handleOnDragEnd = (result: DropResult) => {
    if (songs) {
      let movedSong = songs[result.source.index];

      if (result.destination) {
        updateSong.mutate({
          id: movedSong.id,
          title: movedSong.title,
          url: movedSong.url,
          albumId: album?.id!,
          albumIndex: result.destination.index + 1,
        });

        songs.splice(result.source.index, 1);
        songs.splice(result.destination.index, 0, movedSong);
      }
    }
  };

  return (
    <div>
      <div>
        <QueryComponent
          isFetching={isAlbumFetching}
          error={albumError}
          data={album}
          ChildJSX={() => (
            <div className="d-flex flex-row m-4">
              <Image
                src={
                  album!.coverGuid === null
                    ? "/placeholder.png"
                    : Config.picturePath + album!.coverGuid + ".png"
                }
                rounded
                style={{
                  width: "15rem",
                  height: "15rem",
                }}
                className="mb-2 mr-4"
              />
              <div className="d-flex flex-column">
                <h1>{album!.title}</h1>
                <h4>{album!.releaseYear}</h4>
                <h4>{album!.genre}</h4>
                <div>
                  <p>{album!.description}</p>
                </div>
              </div>

              <ButtonGroup vertical className="ml-auto mb-auto">
                <Button
                  title="Edit"
                  variant="outline-info"
                  onClick={() => setShowEditAlbum(true)}
                  className="mb-2"
                >
                  <FontAwesomeIcon icon="edit" size="lg" />
                </Button>
                <Button
                  title="Add to Queue"
                  variant="outline-info"
                  onClick={playFunction}
                >
                  <FontAwesomeIcon icon="play" size="lg" />
                </Button>
              </ButtonGroup>
            </div>
          )}
        ></QueryComponent>
      </div>
      <div>
        <div className="d-flex flex-row mx-4 mb-3">
          <h2>Songs</h2>
          <Button
            title="New song"
            variant="outline-info"
            className="ml-auto mb-auto mt-auto"
            onClick={() => setShowAddSong(true)}
            disabled={showAddSong}
          >
            <FontAwesomeIcon icon="plus" size="lg" />
          </Button>
        </div>

        <div className="overflow-auto">
          <QueryComponent
            isFetching={areSongsFetching}
            error={songsError}
            data={songs}
            ChildJSX={() => (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="songs">
                  {(provided) => (
                    <ol
                      className="song-list"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {(songs ?? []).map((s, i) => (
                        <Draggable
                          key={s.id}
                          draggableId={s.id.toString()}
                          index={i}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={i % 2 !== 0 ? "bg-dark" : ""}
                            >
                              <AlbumSongComponent
                                songDto={s}
                                albumId={id}
                                albumIndex={i + 1}
                              ></AlbumSongComponent>
                            </li>
                          )}
                        </Draggable>
                      ))}

                      <li className={showAddSong ? "mr-4" : "d-none mr-4"}>
                        <NewSongComponent
                          show={showAddSong}
                          setShow={setShowAddSong}
                          albumId={id}
                          albumLength={songs?.length!}
                        ></NewSongComponent>
                      </li>
                      {provided.placeholder}
                    </ol>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          ></QueryComponent>
        </div>
      </div>

      {album ? (
        <NewAlbumComponent
          show={showEditAlbum}
          setShow={setShowEditAlbum}
          artistId={-1}
          isEdited={true}
          editedAlbum={album}
        ></NewAlbumComponent>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AlbumDetailsPage;
