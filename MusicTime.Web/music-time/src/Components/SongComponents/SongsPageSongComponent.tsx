import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import DetailedSongDto from "../../Models/DetailedSongDto";
import { Config } from "../../config";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import SongDetails from "./SongDetails";

interface Props {
  detailedSongDto: DetailedSongDto;
}

function SongsPageSongComponent({ detailedSongDto }: Props) {
  const apiBase = Config.apiUrl;
  const [confirm, setConfirm] = useState<boolean>(false);

  function deleteFunction() {
    (async () => {
      setConfirm(false);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios.delete(apiBase + "songs/" + detailedSongDto.songId, config);
    })();
  }

  return (
    <div className="mb-2">
      <div className="d-flex flex-row">
        <SongDetails detailedSongDto={detailedSongDto}></SongDetails>

        <ButtonGroup className="ml-auto">
          <Button variant="outline-info" className="mr-1">
            Add
          </Button>
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
    </div>
  );
}

export default SongsPageSongComponent;