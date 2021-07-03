import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import React from "react";
import axios from "axios";
import { Config } from "../../config";
import SongDto from "../../Models/SongDto";
import { useForm } from "react-hook-form";

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

  function editFunction(data: FormValues) {
    (async () => {
      await axios({
        method: "put",
        url: Config.apiUrl + "songs/" + songDto.id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          albumId: albumId,
        },
        data: {
          Title: data.Title,
          Url: data.Url,
          Id: songDto.id,
        },
      });
    })();
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
            Confirm
          </Button>

          <Button
            className="ml-2"
            variant="outline-secondary"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
}

export default EditSongComponent;
