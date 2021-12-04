import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import React from "react";
import { useForm } from "react-hook-form";
import useCreateSong from "../../Hooks/Mutations/SongMutations/useCreateSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  albumId: number;
  albumLength: number;
}

type FormValues = {
  Title: string;
  Url: string;
};

function NewSongComponent({ show, setShow, albumId, albumLength }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const createSong = useCreateSong();

  function postFunction(data: FormValues) {
    createSong.mutate({
      albumId: albumId,
      title: data.Title,
      url: data.Url,
      albumIndex: albumLength + 1,
    });
  }

  return (
    <div>
      {show && (
        <Form
          onSubmit={handleSubmit((data) => {
            postFunction(data);
            setShow(false);
          })}
        >
          <div className="d-flex flex-row ml-1">
            <div className="w-100">
              <Form.Control
                maxLength={50}
                {...register("Title", { required: true })}
                placeholder={"title"}
              />
              {errors.Title?.type === "required" && (
                <div
                  style={{ fontSize: "medium" }}
                  className="text-danger font-weight-normal"
                >
                  Title is required
                </div>
              )}
            </div>

            <div className="w-100 ml-2">
              <Form.Control
                maxLength={150}
                {...register("Url", { required: true })}
                placeholder={"url"}
              />
              {errors.Url?.type === "required" && (
                <div
                  style={{ fontSize: "medium" }}
                  className="text-danger font-weight-normal"
                >
                  Url is required
                </div>
              )}
            </div>

            <ButtonGroup className="ml-4">
              <Button title="Confirm" variant="outline-info" type="submit">
                <FontAwesomeIcon icon="check" size="lg" />
              </Button>

              <Button
                title="Cancel"
                className="ml-1"
                variant="outline-secondary"
                onClick={() => setShow(false)}
              >
                <FontAwesomeIcon icon="times" size="lg" />
              </Button>
            </ButtonGroup>
          </div>
        </Form>
      )}
    </div>
  );
}

export default NewSongComponent;
