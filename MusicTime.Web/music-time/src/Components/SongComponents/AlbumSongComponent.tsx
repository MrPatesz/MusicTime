import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import SongDto from "../../Models/SongDto";
import { Config } from "../../config";
import EditSongComponent from "./EditSongComponent";

interface Props {
  songDto: SongDto;
  albumId: number;
}

function AlbumSongComponent({ songDto, albumId }: Props) {
  const apiLink = Config.apiUrl + "songs/" + songDto.id;

  const [confirm, setConfirm] = useState<boolean>(false);
  const [editSong, setEditSong] = useState<boolean>(false);

  function deleteFunction() {
    const deleteCall = async () => {
      setConfirm(false);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios.delete(apiLink, config);
    };
    deleteCall();
  }

  return (
    <div className="mb-1">
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
            <Button variant="outline-info">Add</Button>
            <Button
              className="ml-2"
              variant="outline-info"
              onClick={() => setEditSong(true)}
            >
              Edit
            </Button>
            <Button
              className="ml-2"
              variant="outline-danger"
              onClick={() => setConfirm(true)}
            >
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
      )}
    </div>
  );
}

export default AlbumSongComponent;
