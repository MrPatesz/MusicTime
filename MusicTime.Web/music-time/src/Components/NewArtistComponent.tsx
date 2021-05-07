import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import { Config } from "../config";

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

  async function postFunction() {
    let apiLink = Config.apiUrl + "artists/";
    var postData;
    if (isEdited) {
      postData = async () => {
        return await axios({
          method: "put",
          url: apiLink + editedArtist.id,
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
        return await axios({
          method: "post",
          url: apiLink,
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
    var newArtist = await postData();

    postPicture(((newArtist.data as unknown) as ArtistDto).id);
  }

  function postPicture(artistId: number) {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("File", selectedFile, selectedFile.name);

      const postPictureData = async () => {
        await axios({
          method: "put",
          url: Config.apiUrl + "pictures/artist/" + artistId,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: formData,
        });
      };
      postPictureData();
    }
    setSelectedFile(null);
  }

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
                label="Picture"
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
