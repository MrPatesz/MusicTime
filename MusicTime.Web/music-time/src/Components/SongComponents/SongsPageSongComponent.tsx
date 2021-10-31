import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DetailedSongDto from "../../Models/DetailedSongDto";
import SongDto from "../../Models/SongDto";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import SongDetails from "./SongDetails";
import AddToPlaylistComponent from "./AddToPlaylistComponent";
import useDeleteSong from "../../Hooks/Mutations/SongMutations/useDeleteSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setQueue } from "../../redux/player";

interface Props {
  detailedSongDto: DetailedSongDto;
}

function SongsPageSongComponent({ detailedSongDto }: Props) {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const dispatch = useDispatch();

  const deleteSong = useDeleteSong("detailedSongs");

  function deleteFunction() {
    deleteSong.mutate(detailedSongDto.songId);
    setConfirm(false);
  }

  return (
    <div className="mb-2 ml-2 mr-4">
      <div className="d-flex flex-row">
        <SongDetails detailedSongDto={detailedSongDto}></SongDetails>

        <ButtonGroup className="ml-auto">
          <Button
            title="Play song"
            variant="outline-info"
            className="mr-1"
            onClick={() => dispatch(setQueue([detailedSongDto]))}
          >
            <FontAwesomeIcon icon="play" size="lg" />
          </Button>
          <Button
            title="Add to playlist"
            variant="outline-info"
            className="mr-1"
            onClick={() => setShowAdd(true)}
          >
            <FontAwesomeIcon icon="external-link-alt" size="lg" />
          </Button>
          <Button
            title="Delete"
            variant="outline-danger"
            onClick={() => setConfirm(true)}
          >
            <FontAwesomeIcon icon="trash-alt" size="lg" />
          </Button>
        </ButtonGroup>

        <Modal
          show={confirm}
          onHide={() => setConfirm(false)}
          backdrop="static"
          keyboard={false}
          animation={false}
        >
          <Modal.Header>
            <Modal.Title>Deleting "{detailedSongDto.songTitle}"</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete "{detailedSongDto.songTitle}"?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="outline-danger" onClick={() => deleteFunction()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <AddToPlaylistComponent
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          songDto={
            new SongDto(
              detailedSongDto.songId,
              detailedSongDto.songTitle,
              detailedSongDto.url
            )
          }
        ></AddToPlaylistComponent>
      </div>
    </div>
  );
}

export default SongsPageSongComponent;
