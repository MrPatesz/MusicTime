import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Config } from "../../config";
import SongDto from "../../Models/SongDto";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<any>>;
  albumId: number;
  songDto: SongDto;
}

function EditSongComponent({ setShow, albumId, songDto }: Props) {
  const [title, setTitle] = useState<string>(songDto.title);
  const [url, setUrl] = useState<string>(songDto.url);

  function editFunction() {
    const postData = async () => {
      await axios({
        method: "put",
        url: Config.apiUrl + "songs/" + songDto.id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          albumId: albumId,
        },
        data: {
          Title: title,
          Url: url,
          Id: songDto.id,
        },
      });
    };
    postData();
  }

  return (
    <div className="d-flex flex-row">
      <Form.Control
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={"title"}
      ></Form.Control>

      <Form.Control
        defaultValue={url}
        className="ml-2"
        onChange={(e) => setUrl(e.target.value)}
        placeholder={"url"}
      ></Form.Control>

      <ButtonGroup className="ml-5">
        <Button
          variant="outline-info"
          onClick={() => {
            editFunction();
            setShow(false);
          }}
        >
          Confirm
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
  );
}

export default EditSongComponent;
