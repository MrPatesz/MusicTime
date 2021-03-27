import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import axios from "axios";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
}

function AddAlbumComponent({ show, setShow }: Props) {
  const [newAlbumTitle, setNewAlbumTitle] = useState<string>("");
  const [newAlbumDescription, setNewAlbumDescription] = useState<string>("");

  function postFunction() {
    const postData = async () => {
      await axios({
        method: "post",
        url: "https://localhost:5001/api/albums/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        data: {
          Title: newAlbumTitle,
          Description: newAlbumDescription,
        },
      });
      //const newAlbum = result.data;
      /*setAlbums(
        albums.concat(
          new AlbumDto(
            100,
            newAlbumTitle,
            "genre",
            newAlbumDescription,
            2005,
            null
          )
        )
      );*/
    };
    postData();
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewAlbumTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" onChange={(e) => {}} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Year of Release</Form.Label>
              <Form.Control type="number" onChange={(e) => {}} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewAlbumDescription(e.target.value)}
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
              if (newAlbumTitle !== "") {
                setShow(false);
                setNewAlbumTitle("");
                setNewAlbumDescription("");

                postFunction();
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

export default AddAlbumComponent;
