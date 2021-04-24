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

function NewArtistComponent({ show, setShow, isEdited, editedArtist }: Props) {
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (isEdited) {
      setName(editedArtist.name);
      setDescription(editedArtist.description);
    }
  }, [isEdited, editedArtist]);

  function postFunction() {
    var postData;
    if (isEdited) {
      postData = async () => {
        await axios({
          method: "put",
          url: "https://localhost:5001/api/artists/" + editedArtist.id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: {
            Name: name,
            Description: description,
            Id: editedArtist.id,
          },
        });
      };
    } else {
      postData = async () => {
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
    }
    postData();
    savePicture();

    // check whether the call was successful
    editedArtist.name = name ? name : "";
    editedArtist.description = description;
  }

  function savePicture() {
    if (selectedFile !== null) {
      const getPictureGuid = async () => {
        const result = await axios({
          method: "put",
          url:
            "https://localhost:5001/api/artists/" +
            editedArtist.id +
            "/getPictureGuid",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setPictureGuid(result.data);
      };
      getPictureGuid();

      /*var filename = pictureGuid + ".png";
      var text = "Text of the file goes here.";
      var blob = new Blob([text], { type: "text/plain" });
      var link = document.createElement("a");
      link.download = filename;
      link.innerHTML = "Download File";
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link);

      const formData = new FormData();
      formData.append("image", selectedFile, pictureGuid + ".png");
      var file = formData.get("file");*/
    }

    setPictureGuid(null);
    setSelectedFile(null);
  }

  const [pictureGuid, setPictureGuid] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function fileSelected(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setSelectedFile(file);
  }

  function confirmButton() {
    if (name !== "") {
      postFunction();

      setShow(false);
      setName(null);
      setDescription(null);
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
          <Modal.Title>{isEdited ? "Edit Artist" : "New Artist"}</Modal.Title>
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
              <Form.File
                accept="image/*"
                name="file"
                label="Picture"
                feedbackTooltip
                onChange={fileSelected}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="outline-info" onClick={confirmButton}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewArtistComponent;
