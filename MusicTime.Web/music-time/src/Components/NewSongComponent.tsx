import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Config } from "../config";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  albumId: number;
}

function NewSongComponent({ show, setShow, albumId }: Props) {
  const [title, setTitle] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  function postFunction() {
    const postData = async () => {
      await axios({
        method: "post",
        url: Config.apiUrl + "songs/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          albumId: albumId,
        },
        data: {
          Title: title,
          Url: url,
        },
      });
    };
    postData();
  }

  return (
    <div>
      {show ? (
        <div className="d-flex flex-row">
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"title"}
          ></Form.Control>

          <Form.Control
            className="ml-2"
            onChange={(e) => setUrl(e.target.value)}
            placeholder={"url"}
          ></Form.Control>

          <ButtonGroup className="ml-5">
            <Button
              variant="outline-info"
              onClick={() => {
                postFunction();
                setShow(false);
              }}
            >
              Add
            </Button>

            <Button
              className="ml-2"
              variant="outline-secondary"
              onClick={() => {
                setShow(false);
                setTitle("");
                setUrl("");
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default NewSongComponent;
