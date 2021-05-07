import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import { Config } from "../config";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  artistId: number;
  isEdited: boolean;
  editedAlbum: AlbumDto;
}

function NewAlbumComponent({
  show,
  setShow,
  artistId,
  isEdited,
  editedAlbum,
}: Props) {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [releaseYear, setReleaseYear] = useState<number | null>(null);

  useEffect(() => {
    if (isEdited) {
      setTitle(editedAlbum.title);
      setDescription(editedAlbum.description);
      setGenre(editedAlbum.genre);
      setReleaseYear(editedAlbum.releaseYear);
    }
  }, [isEdited, editedAlbum]);

  async function postFunction() {
    let apiLink = Config.apiUrl + "albums/";
    var postData;
    if (isEdited) {
      postData = async () => {
        return await axios({
          method: "put",
          url: apiLink + editedAlbum.id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: {
            Title: title,
            Description: description,
            Genre: genre,
            ReleaseYear: releaseYear,
            Id: editedAlbum.id,
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
            artistId: artistId,
          },
          data: {
            Title: title,
            Description: description,
            Genre: genre,
            ReleaseYear: releaseYear,
          },
        });
      };
    }
    var newAlbum = await postData();

    postPicture(((newAlbum.data as unknown) as AlbumDto).id);
  }

  function postPicture(albumId: number) {
    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append("File", selectedFile, selectedFile.name);

      const postPictureData = async () => {
        await axios({
          method: "put",
          url: Config.apiUrl + "pictures/album/" + albumId,
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
          <Modal.Title>{isEdited ? "Edit Album" : "New Album"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={title ? title : ""}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setGenre(e.target.value)}
                defaultValue={genre ? genre : ""}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Year of Release</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setReleaseYear(Number(e.target.value))}
                defaultValue={releaseYear ? releaseYear : ""}
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
              if (title !== "") {
                postFunction();

                setShow(false);
                setTitle(null);
                setDescription(null);
                setGenre(null);
                setReleaseYear(null);
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

export default NewAlbumComponent;
