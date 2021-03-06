import { Button, Modal, Spinner, Toast } from "react-bootstrap";
import AutosuggestComponent from "../Autosuggest/AutosuggestComponent";
import PlaylistDto from "../../Models/PlaylistDto";
import SongDto from "../../Models/SongDto";
import { useState } from "react";
import usePlaylists from "../../Hooks/Queries/PlaylistQueries/usePlaylists";
import useAddSong from "../../Hooks/Mutations/PlaylistMutations/useAddSong";
import Alert from "react-bootstrap/Alert";

interface Props {
  showAdd: boolean;
  setShowAdd: (show: boolean) => void;
  songDto: SongDto;
}

function AddSongToPlaylistComponent({ showAdd, setShowAdd, songDto }: Props) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistDto>();
  const [playlistTitle, setPlaylistTitle] = useState<string>("");
  const [showSuccessfulAdd, setShowSuccessfulAdd] = useState<boolean>(false);
  const [playlistError, setPlaylistError] = useState<boolean>(false);

  const { data: playlists, error, isFetching } = usePlaylists();
  const addSongToPlaylist = useAddSong(setShowAdd);

  function onPlaylistChange(selected: string) {
    let playlist = playlists?.find((p) => p.title === selected);
    if (playlist) {
      setSelectedPlaylist(playlist);
    } else {
      setSelectedPlaylist(undefined);
    }
    setPlaylistTitle(selected);
    if (playlistError) {
      setPlaylistError(false);
    }
  }

  function addFunction() {
    if (selectedPlaylist) {
      addSongToPlaylist.mutate({
        songDto: songDto,
        playlistId: selectedPlaylist.id,
      });
      setShowSuccessfulAdd(true);
    } else if (playlistTitle !== "") {
      alert("Playlist does not exist!");
    } else {
      setPlaylistError(true);
    }
  }

  return (
    <div>
      <Modal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>{'Add "' + songDto.title + '" to'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error ? (
            <Alert variant="danger">
              An error occurred while fetching data!
            </Alert>
          ) : playlists ? (
            <div>
              <AutosuggestComponent
                placeholder="a playlist..."
                data={playlists.map((p) => p.title)}
                onValueChanged={onPlaylistChange}
                maxLength={50}
              />
              {playlistError && (
                <div className="text-danger">Playlist is required</div>
              )}
            </div>
          ) : isFetching ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <div />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button variant="outline-info" onClick={() => addFunction()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="font-weight-normal"
        style={{ position: "fixed", top: "10px", right: "10px" }}
      >
        <Toast
          className="bg-info"
          show={showSuccessfulAdd}
          onClose={() => setShowSuccessfulAdd(false)}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Successful add</strong>
            <small className="ml-auto" />
          </Toast.Header>
          <Toast.Body className="text-white">
            Successfully added "{songDto.title}" to "{selectedPlaylist?.title}"
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default AddSongToPlaylistComponent;
