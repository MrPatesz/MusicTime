import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import DetailedSongDto from "../../Models/DetailedSongDto";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Config } from "../../config";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

interface Props {
  detailedSongDto: DetailedSongDto;
  playlistId: number;
}

function DetailedSongComponent({ detailedSongDto, playlistId }: Props) {
  const apiBase = Config.apiUrl;
  const [confirm, setConfirm] = useState<boolean>(false);

  function removeFunction() {
    const postData = async () => {
      await axios({
        method: "post",
        url: apiBase + "playlists/" + playlistId + "/removeSong",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        data: {
          Id: detailedSongDto.songId,
          Title: detailedSongDto.songTitle,
          Url: detailedSongDto.url,
        },
      });
    };
    postData();
  }

  function deleteFunction() {
    const deleteCall = async () => {
      setConfirm(false);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios.delete(apiBase + "songs/" + detailedSongDto.songId, config);
    };
    deleteCall();
  }

  return (
    <div className="mb-1">
      <div className="d-flex flex-row">
        <Container fluid className="mt-auto">
          <Row>
            <Col xs={12} sm={8} lg={6}>
              <h5>
                <a href={detailedSongDto.url} className="text-info">
                  {detailedSongDto.songTitle}
                </a>
              </h5>
            </Col>

            <Col className="d-none d-sm-block" sm={4} md={3}>
              <h5>
                <Link
                  className="text-info"
                  to={"/artists/" + detailedSongDto.artistId}
                >
                  {detailedSongDto.artistName}
                </Link>
              </h5>
            </Col>

            <Col className="d-none d-lg-block" lg={3}>
              <h5>
                <Link
                  className="text-info"
                  to={"/albums/" + detailedSongDto.albumId}
                >
                  {detailedSongDto.albumTitle}
                </Link>
              </h5>
            </Col>
          </Row>
        </Container>

        {playlistId === -1 ? (
          <ButtonGroup className="ml-auto">
            <Button variant="outline-info" className="mr-2">
              Add
            </Button>
            <Button variant="outline-danger" onClick={() => setConfirm(true)}>
              Delete
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup className="ml-auto">
            <Button variant="outline-warning" onClick={() => removeFunction()}>
              Remove
            </Button>
          </ButtonGroup>
        )}

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
    </div>
  );
}

export default DetailedSongComponent;
