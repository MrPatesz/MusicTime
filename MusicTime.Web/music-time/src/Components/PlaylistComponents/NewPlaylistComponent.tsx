import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import axios from "axios";
import PlaylistDto from "../../Models/PlaylistDto";
import { Config } from "../../config";
import { useForm } from "react-hook-form";
import { ButtonToolbar } from "react-bootstrap";

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

  async function postFunction(data: FormValues) {
    let apiLink = Config.apiUrl + "playlists/";
    var postData;
    if (isEdited) {
      postData = async () => {
        return await axios({
          method: "put",
          url: apiLink + editedPlaylist.id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: {
            Title: data.Title,
            Description: data.Description,
            Id: editedPlaylist.id,
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
            Title: data.Title,
            Description: data.Description,
          },
        });
      };
    }
    var newPlaylist = await postData();

    postPicture((newPlaylist.data as unknown as PlaylistDto).id);
  }

  function postPicture(playlistId: number) {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("File", selectedFile, selectedFile.name);

      const postPictureData = async () => {
        await axios({
          method: "put",
          url: Config.apiUrl + "pictures/playlist/" + playlistId,
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
