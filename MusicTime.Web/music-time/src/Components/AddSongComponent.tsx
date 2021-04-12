import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import React from "react";
import { useState } from "react";
import axios from "axios";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  albumId: number;
}

function AddSongComponent({ show, setShow, albumId }: Props) {
  const [title, setTitle] = useState<string | null>(null);

  function postFunction() {
    const postData = async () => {
      await axios({
        method: "post",
        url: "https://localhost:5001/api/songs/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          albumId: albumId,
        },
        data: {
          Title: title,
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
          </ButtonGroup>
          <ButtonGroup className="ml-2">
            <Button
              variant="outline-secondary"
              onClick={() => {
                setShow(false);
                setTitle("");
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

export default AddSongComponent;