import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import React from "react";
import axios from "axios";
import { Config } from "../../config";
import { useForm } from "react-hook-form";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  albumId: number;
}

type FormValues = {
  Title: string;
  Url: string;
};

function NewSongComponent({ show, setShow, albumId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function postFunction(data: FormValues) {
    (async () => {
      await axios({
        method: "post",
        url: Config.apiUrl + "songs/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          albumId: albumId,
        },
        data: data,
      });
    })();
  }

  return (
    <div>
      {show ? (
        <Form
          onSubmit={handleSubmit((data) => {
            postFunction(data);
            setShow(false);
          })}
        >
          <div className="d-flex flex-row">
            <Form.Control
              {...register("Title", { required: true })}
              placeholder={"title"}
            ></Form.Control>
            {errors.Title?.type === "required" && "Title is required"}

            <Form.Control
              className="ml-2"
              {...register("Url", { required: true })}
              placeholder={"url"}
            ></Form.Control>
            {errors.Url?.type === "required" && "Url is required"}

            <ButtonGroup className="ml-5">
              <Button variant="outline-info" type="submit">
                Add
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
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default NewSongComponent;
