import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  isEdited: boolean;
  editedArtist: ArtistDto;
}

function AddArtistComponent({ show, setShow, isEdited, editedArtist }: Props) {
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (isEdited) {
      setName(editedArtist.name);
      setDescription(editedArtist.description);
    }
  }, [isEdited, editedArtist]);

  function postFunction() {
    if (isEdited) {
      let data = {
        Name: name,
        Description: description,
        Id: editedArtist.id,
      };
      console.log(data);
      const postData = async () => {
        await axios({
          method: "put",
          url: "https://localhost:5001/api/artists/" + editedArtist.id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: data,
        });
      };
      postData();
    } else {
      const postData = async () => {
        await axios({
          method: "post",
          url: "https://localhost:5001/api/artists/",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: {
            Name: name,
            Description: description,
          },
        });
      };
      postData();
    }
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
          <Modal.Title>New Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                defaultValue={name ? name : ""}
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
              if (name !== "") {
                setShow(false);
                setName(null);
                setDescription(null);

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

export default AddArtistComponent;
