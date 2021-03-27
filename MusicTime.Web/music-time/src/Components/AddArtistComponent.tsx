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
  const [newArtistName, setNewArtistName] = useState<string>("");
  const [newArtistDescription, setNewArtistDescription] = useState<string>("");

  function postFunction() {
    const postData = async () => {
      /*const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        await axios.post("https://localhost:5001/api/artists/", config);*/

      await axios({
        method: "post",
        url: "https://localhost:5001/api/artists/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        data: {
          Name: newArtistName,
          Description: newArtistDescription,
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
                onChange={(e) => setNewArtistName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewArtistDescription(e.target.value)}
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
              if (newArtistName !== "") {
                setShow(false);
                setNewArtistName("");
                setNewArtistDescription("");

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
