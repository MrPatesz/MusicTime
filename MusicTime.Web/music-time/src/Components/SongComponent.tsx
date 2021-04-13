import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";

interface Props {
  title: string;
  artist: string | null;
  album: string | null;
  id: number;
}

function SongComponent({ title, artist, album, id }: Props) {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [showAddSongToPlaylist, setShowAddSongToPlaylist] = useState<boolean>(false);

  function deleteFunction() {
    const deleteCall = async () => {
      setConfirm(false);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios.delete("https://localhost:5001/api/songs/" + id, config);
    };
    deleteCall();
  }

  function removeFunction() {
    //remove song from playlist
  }

  return (
    <div className="mb-1">
      {artist === null ? (
        <div className="d-flex flex-row">
          <h5>{title}</h5>

          <ButtonGroup className="ml-auto">
            <Button variant="outline-info"> Add </Button>
          </ButtonGroup>
          <ButtonGroup className="ml-2">
            <Button variant="outline-danger" onClick={() => setConfirm(true)}>
              Delete
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
      ) : (
        <div className="d-flex flex-row">
          <h4 className="mr-5">{title}</h4>
          <div className="mr-5">{" by "}</div>
          <h5 className="mr-5">{artist}</h5>
          <div className="mr-5">{" from "}</div>
          <h5 className="mr-5">{album}</h5>

          <ButtonGroup className="ml-auto">
            <Button variant="outline-info"> Add </Button>
          </ButtonGroup>
          <ButtonGroup className="ml-2">
            <Button variant="outline-warning" onClick={() => removeFunction()}>
              Remove
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
}

export default SongComponent;
