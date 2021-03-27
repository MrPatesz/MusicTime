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

function AddArtistComponent({ show, setShow }: Props) {
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  function postFunction() {
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
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
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
