import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import React from "react";
import SongDto from "../../Models/SongDto";
import { useForm } from "react-hook-form";
import useUpdateSong from "../../Hooks/Mutations/SongMutations/useUpdateSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<any>>;
  albumId: number;
  songDto: SongDto;
}

type FormValues = {
  Title: string;
  Url: string;
};

function EditSongComponent({ setShow, albumId, songDto }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const updateSong = useUpdateSong();

  function editFunction(data: FormValues) {
    updateSong.mutate({
      id: songDto.id,
      url: data.Url,
      title: data.Title,
      albumId: albumId,
    });
  }

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        editFunction(data);
        setShow(false);
      })}
    >
      <div className="d-flex flex-row">
        <Form.Control
          defaultValue={songDto.title}
          {...register("Title", { required: true })}
          placeholder={"title"}
        ></Form.Control>
        {errors.Title?.type === "required" && "Title is required"}

        <Form.Control
          defaultValue={songDto.url}
          className="ml-2"
          {...register("Url", { required: true })}
          placeholder={"url"}
        ></Form.Control>
        {errors.Url?.type === "required" && "Url is required"}

        <ButtonGroup className="ml-5">
          <Button variant="outline-info" type="submit">
          <FontAwesomeIcon size="lg" icon="check" />
          </Button>

          <Button
            className="ml-1"
            variant="outline-secondary"
            onClick={() => setShow(false)}
          >
            <FontAwesomeIcon size="lg" icon="times" />
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
}

export default EditSongComponent;
