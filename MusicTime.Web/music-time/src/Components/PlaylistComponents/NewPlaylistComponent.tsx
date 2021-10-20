import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import PlaylistDto from "../../Models/PlaylistDto";
import { useForm } from "react-hook-form";
import { ButtonToolbar } from "react-bootstrap";
import useCreatePlaylist from "../../Hooks/Mutations/PlaylistMutations/useCreatePlaylist";
import useUpdatePlaylist from "../../Hooks/Mutations/PlaylistMutations/useUpdatePlaylist";
import useUploadPicture from "../../Hooks/Mutations/PictureMutations/useUploadPicture";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  isEdited: boolean;
  editedPlaylist: PlaylistDto;
}

type FormValues = {
  Title: string;
  Description: string;
};

function NewPlaylistComponent({
  show,
  setShow,
  isEdited,
  editedPlaylist,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const createPlaylist = useCreatePlaylist();
  const updatePlaylist = useUpdatePlaylist();
  const uploadPicture = useUploadPicture({
    relativeLink: "playlist",
    toInvalidate: "playlists",
  });

  async function postFunction(data: FormValues) {
    if (isEdited) {
      let updatedPlaylist = await updatePlaylist.mutateAsync({
        id: editedPlaylist.id,
        title: data.Title,
        description: data.Description,
      });
      postPicture(updatedPlaylist.id);
    } else {
      let newPlaylist = await createPlaylist.mutateAsync({
        title: data.Title,
        description: data.Description,
      });
      postPicture(newPlaylist.id);
    }
  }

  function postPicture(playlistId: number) {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("File", selectedFile, selectedFile.name);

      uploadPicture.mutate({
        id: playlistId,
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
          <Modal.Title>
            {isEdited ? "Edit Playlist" : "New Playlist"}
          </Modal.Title>
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
                defaultValue={editedPlaylist.title}
              />
              {errors.Title?.type === "required" && "Title is required"}
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={{ resize: "vertical" }}
                as="textarea"
                maxLength={256}
                type="text"
                {...register("Description")}
                defaultValue={editedPlaylist.description ?? ""}
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

export default NewPlaylistComponent;
