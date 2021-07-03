import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import { Config } from "../config";
import { useForm } from "react-hook-form";
import { ButtonToolbar } from "react-bootstrap";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  isEdited: boolean;
  editedArtist: ArtistDto;
}

type FormValues = {
  Name: string;
  Description: string;
};

function NewArtistComponent({ show, setShow, isEdited, editedArtist }: Props) {
  const { register, handleSubmit } = useForm<FormValues>();

  async function postFunction(data: FormValues) {
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
            Name: data.Name,
            Description: data.Description,
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
            Name: data.Name,
            Description: data.Description,
          },
        });
      };
    }
    var newArtist = await postData();

    postPicture((newArtist.data as unknown as ArtistDto).id);
  }

  function postPicture(artistId: number) {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("File", selectedFile, selectedFile.name);

      (async () => {
        await axios({
          method: "put",
          url: Config.apiUrl + "pictures/artist/" + artistId,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: formData,
        });
      })();
    }
    setSelectedFile(null);
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function fileSelected(event: React.ChangeEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setSelectedFile(file);
  }

  function confirmButton(data: FormValues) {
    postFunction(data);

    setShow(false);
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
          <Form onSubmit={handleSubmit((data) => confirmButton(data))}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register("Name", { required: true })}
                defaultValue={editedArtist.name ?? ""}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                {...register("Description", { maxLength: 256 })}
                defaultValue={editedArtist.description ?? ""}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                accept="image/*"
                label="Picture"
                onChange={fileSelected}
              />
            </Form.Group>

            <ButtonToolbar className="justify-content-between">
              <Button
                variant="outline-secondary"
                onClick={() => setShow(false)}
              >
                Cancel
              </Button>
              <Button variant="outline-info" type="submit">
                Confirm
              </Button>
            </ButtonToolbar>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewArtistComponent;
