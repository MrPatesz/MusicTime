import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import SongDto from "../../Models/SongDto";
import EditSongComponent from "./EditSongComponent";
import AddToPlaylistComponent from "./AddToPlaylistComponent";
import useDeleteSong from "../../Hooks/Mutations/SongMutations/useDeleteSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  songDto: SongDto;
  albumId: number;
}

function AlbumSongComponent({ songDto, albumId }: Props) {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [editSong, setEditSong] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const deleteSong = useDeleteSong("albumsSongs");

  function deleteFunction() {
    deleteSong.mutate(songDto.id);
    setConfirm(false);
  }

  return (
    <div className="mb-2">
      {editSong ? (
        <EditSongComponent
          songDto={songDto}
          albumId={albumId}
          setShow={setEditSong}
        ></EditSongComponent>
      ) : (
        <div className="d-flex flex-row">
          <h5 className="pl-3 mb-auto mt-auto">
            <a href={songDto.url} className="text-info">
              {songDto.title}
            </a>
          </h5>

          <ButtonGroup className="ml-auto">
            <Button variant="outline-info" onClick={() => setShowAdd(true)}>
              <FontAwesomeIcon icon="plus" size="lg" />
            </Button>
            <Button
              className="ml-1"
              variant="outline-info"
              onClick={() => setEditSong(true)}
            >
              <FontAwesomeIcon icon="edit" size="lg" />
            </Button>
            <Button
              className="ml-1"
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
              <Modal.Title>Deleting item</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
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
        </div>
      )}

      <AddToPlaylistComponent
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        songDto={songDto}
      ></AddToPlaylistComponent>
    </div>
  );
}

export default AlbumSongComponent;
