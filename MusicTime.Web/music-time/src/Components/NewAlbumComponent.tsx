import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import { Config } from "../config";
import { useForm } from "react-hook-form";
import { ButtonToolbar } from "react-bootstrap";
import useCreateAlbum from "../Hooks/Mutations/AlbumMutations/useCreateAlbum";
import useUpdateAlbum from "../Hooks/Mutations/AlbumMutations/useUpdateAlbum";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  artistId: number;
  isEdited: boolean;
  editedAlbum: AlbumDto;
}

type FormValues = {
  Title: string;
  Description: string;
  Genre: string;
  ReleaseYear: number;
};

function NewAlbumComponent({
  show,
  setShow,
  artistId,
  isEdited,
  editedAlbum,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const createAlbum = useCreateAlbum();
  const updateAlbum = useUpdateAlbum();

  async function postFunction(data: FormValues) {
    if (isEdited) {
      let updatedAlbum = await updateAlbum.mutateAsync({
        id: editedAlbum.id,
        title: data.Title,
        description: data.Description,
        genre: data.Genre,
        releaseYear: data.ReleaseYear,
      });
      postPicture(updatedAlbum.id);
    } else {
      let newAlbum = await createAlbum.mutateAsync({
        artistId: artistId,
        title: data.Title,
        description: data.Description,
        genre: data.Genre,
        releaseYear: data.ReleaseYear,
      });
      postPicture(newAlbum.id);
    }
  }

  function postPicture(albumId: number) {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("File", selectedFile, selectedFile.name);

      (async () => {
        await axios({
          method: "put",
          url: Config.apiUrl + "pictures/album/" + albumId,
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
          <Modal.Title>{isEdited ? "Edit Album" : "New Album"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit((data) => {
              postFunction(data);
              setShow(false);
            })}
          >
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                {...register("Title", { required: true })}
                defaultValue={editedAlbum.title ?? ""}
              />
              {errors.Title?.type === "required" && "Title is required"}
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                {...register("Genre")}
                defaultValue={editedAlbum.genre ?? ""}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Year of Release</Form.Label>
              <Form.Control
                type="number"
                {...register("ReleaseYear", { valueAsNumber: true })}
                defaultValue={editedAlbum.releaseYear ?? ""}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                {...register("Description")}
                defaultValue={editedAlbum.description ?? ""}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                label="Cover"
                accept="image/*"
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

export default NewAlbumComponent;
