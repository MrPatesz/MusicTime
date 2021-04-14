import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import SongDto from "../Models/SongDto";
import DetailedSongDto from "../Models/DetailedSongDto";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  detailed: boolean;
  songDto: SongDto;
  detailedSongDto: DetailedSongDto;
}

function SongComponent({ detailed, songDto, detailedSongDto }: Props) {
  const [confirm, setConfirm] = useState<boolean>(false);
  //const [showAddSongToPlaylist, setShowAddSongToPlaylist] = useState<boolean>(false);

  function deleteFunction() {
    const deleteCall = async () => {
      setConfirm(false);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const id = detailed ? detailedSongDto.songId : songDto.id;
      await axios.delete("https://localhost:5001/api/songs/" + id, config);
    };
    deleteCall();
  }

  function removeFunction() {
    //remove song from playlist
  }

  return (
    <div className="mb-1">
      {detailed ? (
        <div className="d-flex flex-row">
          <Container fluid>
            <Row>
              <Col xs={12} sm={8} md={8} lg={6}>
                <h5>{detailedSongDto.songTitle}</h5>
              </Col>
              <Col className="d-none d-md-block" md={1} lg={1}>
                <div>{" by "}</div>
              </Col>
              <Col className="d-none d-sm-block" sm={4} md={3} lg={2}>
                <h5>{detailedSongDto.artistName}</h5>
              </Col>
              <Col className="d-none d-lg-block" lg={1}>
                <div>{" from "}</div>
              </Col>
              <Col className="d-none d-lg-block" lg={2}>
                <h5>{detailedSongDto.albumTitle}</h5>
              </Col>
            </Row>
          </Container>

          <ButtonGroup className="ml-auto">
            <Button variant="outline-info"> Add </Button>
          </ButtonGroup>
          <ButtonGroup className="ml-2">
            <Button variant="outline-warning" onClick={() => removeFunction()}>
              Remove
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <div className="d-flex flex-row">
          <h5>
            <a href={songDto.url} className="text-info">
              {songDto.title}
            </a>
          </h5>

          <ButtonGroup className="ml-auto">
            <Button variant="outline-info"> Add </Button>
          </ButtonGroup>
          <ButtonGroup className="ml-2">
            <Button variant="outline-danger" onClick={() => setConfirm(true)}>
              Delete
            </Button>
          </ButtonGroup>

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
              <Button
                variant="outline-secondary"
                onClick={() => setConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="outline-danger" onClick={() => deleteFunction()}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default SongComponent;
