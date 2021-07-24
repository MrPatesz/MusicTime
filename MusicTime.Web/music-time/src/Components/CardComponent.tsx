import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Config } from "../config";

interface Props {
  title: string;
  pictureGuid: string | null;
  deleteLink: string;
  linkTo: string;
  objectId: number;
}

function CardComponent({
  title,
  pictureGuid,
  deleteLink,
  linkTo,
  objectId,
}: Props) {
  if (pictureGuid === null) pictureGuid = "/placeholder.png";
  else {
    pictureGuid = Config.picturePath + pictureGuid + ".png";
  }

  const [confirm, setConfirm] = useState<boolean>(false);
  function deleteFunction() {
    (async () => {
      setConfirm(false);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios.delete(deleteLink + objectId, config);
    })();
  }

  return (
    <div>
      <Card
        style={{ minWidth: "11rem", maxWidth: "15rem" }}
        className="bg-dark text-white mb-3"
      >
        <Card.Img
          variant="top"
          src={pictureGuid}
          style={{ minHeight: "11rem", maxHeight: "15rem" }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <ButtonToolbar>
            <ButtonGroup className="mr-auto" size="sm">
              <Link to={linkTo + objectId} className="btn btn-outline-info">
                Details
              </Link>
            </ButtonGroup>
            <ButtonGroup size="sm">
              <Button onClick={() => setConfirm(true)} variant="outline-danger">
                Delete
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Body>
      </Card>
      <Modal
        show={confirm}
        onHide={() => setConfirm(false)}
        backdrop="static"
        keyboard={false}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Deleting item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setConfirm(false)}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={() => deleteFunction()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CardComponent;
