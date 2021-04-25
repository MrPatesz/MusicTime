import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PlaylistDto from "../Models/PlaylistDto";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  isEdited: boolean;
  editedPlaylist: PlaylistDto;
}

function NewPlaylistComponent({
  show,
  setShow,
  isEdited,
  editedPlaylist,
}: Props) {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (isEdited) {
      setTitle(editedPlaylist.title);
      setDescription(editedPlaylist.description);
    }
  }, [isEdited, editedPlaylist]);

  function postFunction() {
    var postData;
    if (isEdited) {
      postData = async () => {
        await axios({
          method: "put",
          url: "https://localhost:5001/api/playlists/" + editedPlaylist.id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: {
            Title: title,
            Description: description,
            Id: editedPlaylist.id,
          },
        });
      };
    } else {
      postData = async () => {
        await axios({
          method: "post",
          url: "https://localhost:5001/api/playlists/",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: {
            Title: title,
            Description: description,
          },
        });
      };
    }
    postData();
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>{isEdited ? "Edit Playlist" : "New Playlist"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title ? title : ""}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description ? description : ""}
              />
            </Form.Group>
            <Form.Group>
              <Form.File name="file" label="Picture" feedbackTooltip />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="outline-info"
            onClick={() => {
              if (title !== "") {
                postFunction();

                setShow(false);
                setTitle(null);
                setDescription(null);
              }
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewPlaylistComponent;