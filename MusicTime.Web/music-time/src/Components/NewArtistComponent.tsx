import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import ArtistDto from "../Models/ArtistDto";
import { useForm } from "react-hook-form";
import { ButtonToolbar } from "react-bootstrap";
import useCreateArtist from "../Hooks/Mutations/ArtistMutations/useCreateArtist";
import useUpdateArtist from "../Hooks/Mutations/ArtistMutations/useUpdateArtist";
import useUploadPicture from "../Hooks/Mutations/PictureMutations/useUploadPicture";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const createArtist = useCreateArtist();
  const updateArtist = useUpdateArtist();
  const uploadPicture = useUploadPicture({
    relativeLink: "artist",
    toInvalidate: "artists",
  });

  async function postFunction(data: FormValues) {
    if (isEdited) {
      let updatedArtist = await updateArtist.mutateAsync({
        id: editedArtist.id,
        name: data.Name,
        description: data.Description,
      });
      postPicture(updatedArtist.id);
    } else {
      let newArtist = await createArtist.mutateAsync({
        name: data.Name,
        description: data.Description,
      });
      postPicture(newArtist.id);
    }
  }

  function postPicture(artistId: number) {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("File", selectedFile, selectedFile.name);

      uploadPicture.mutate({
        id: artistId,
        picture: formData,
      });
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
              maxLength={50}
              type="text"
              {...register("Name", { required: true })}
              defaultValue={editedArtist.name ?? ""}
            />
            {errors.Name?.type === "required" && (
              <div className="text-danger">Name is required</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              style={{ resize: "vertical" }}
              as="textarea"
              maxLength={256}
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
            <Button variant="outline-secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="outline-info" type="submit">
              Confirm
            </Button>
          </ButtonToolbar>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewArtistComponent;
