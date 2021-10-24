import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonToolbar } from "react-bootstrap";
import useCreateAlbum from "../Hooks/Mutations/AlbumMutations/useCreateAlbum";
import useCreateArtist from "../Hooks/Mutations/ArtistMutations/useCreateArtist";
import useUploadPicture from "../Hooks/Mutations/PictureMutations/useUploadPicture";
import useArtists from "../Hooks/Queries/ArtistQueries/useArtists";
import AutosuggestComponent from "./Autosuggest/AutosuggestComponent";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
}

type FormValues = {
  Title: string;
  Description: string;
  Genre: string;
  ReleaseYear: number;
};

function QuickNewAlbumComponent({ show, setShow }: Props) {
  const [artistName, setArtistName] = useState<string>("");

  const { data: artists } = useArtists();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const createArtist = useCreateArtist();
  const createAlbum = useCreateAlbum("albums");
  const uploadPicture = useUploadPicture({
    relativeLink: "album",
    toInvalidate: undefined,
  });

  async function postFunction(data: FormValues) {
    let artistExists = artists?.find((a) => a.name === artistName);

    if (artistExists) {
      let newAlbum = await createAlbum.mutateAsync({
        artistId: artistExists.id,
        title: data.Title,
        description: data.Description,
        genre: data.Genre,
        releaseYear: data.ReleaseYear,
      });
      postPicture(newAlbum.id);
    } else {
      let newArtist = await createArtist.mutateAsync({
        name: artistName,
        description: "",
      });
      let newAlbum = await createAlbum.mutateAsync({
        artistId: newArtist.id,
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

      uploadPicture.mutate({
        id: albumId,
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
          <Modal.Title>New Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit((data) => {
              postFunction(data);
              setShow(false);
            })}
          >
            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <div className="w-100">
                <AutosuggestComponent
                  onValueChanged={(value: string) => setArtistName(value)}
                  placeholder={""}
                  data={artists?.map((a) => a.name) ?? []}
                  maxLength={50}
                ></AutosuggestComponent>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                maxLength={50}
                type="text"
                {...register("Title", { required: true })}
                defaultValue=""
              />
              {errors.Title?.type === "required" && "Title is required"}
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                maxLength={50}
                type="text"
                {...register("Genre")}
                defaultValue=""
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Year of Release</Form.Label>
              <Form.Control
                type="number"
                {...register("ReleaseYear", { valueAsNumber: true })}
                defaultValue=""
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                style={{ resize: "vertical" }}
                as="textarea"
                maxLength={256}
                type="text"
                {...register("Description")}
                defaultValue=""
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

export default QuickNewAlbumComponent;
