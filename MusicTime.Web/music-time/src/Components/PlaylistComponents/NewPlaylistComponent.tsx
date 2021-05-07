import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PlaylistDto from "../../Models/PlaylistDto";
import { Config } from "../../config";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  isEdited: boolean;
  editedPlaylist: PlaylistDto;
}

function NewPlaylistComponent({
  show,
  setShow,
  isEdited,
  editedPlaylist,
}: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (isEdited) {
      setTitle(editedPlaylist.title);
      setDescription(
        editedPlaylist.description ? editedPlaylist.description : ""
      );
    }
  }, [isEdited, editedPlaylist]);

  async function postFunction() {
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
            Title: title,
            Description: description,
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
            Title: title,
            Description: description,
          },
        });
      };
    }
    var newPlaylist = await postData();

    postPicture(((newPlaylist.data as unknown) as PlaylistDto).id);
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
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={editedPlaylist.title}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={
                  editedPlaylist.description ? editedPlaylist.description : ""
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                label="Cover"
                accept="image/*"
                onChange={fileSelected}
              />
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
              console.log(title);
              if (title !== "" && title !== null) {
                postFunction();

                setShow(false);
                setTitle("");
                setDescription("");
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

export default NewPlaylistComponent;
