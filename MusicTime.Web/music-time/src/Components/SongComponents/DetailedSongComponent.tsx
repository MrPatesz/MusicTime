import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import DetailedSongDto from "../../Models/DetailedSongDto";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Config } from "../../config";

interface Props {
  detailedSongDto: DetailedSongDto;
  playlistId: number;
}

function DetailedSongComponent({ detailedSongDto, playlistId }: Props) {
  const apiBase = Config.apiUrl;

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

  return (
    <div className="mb-1">
      <div className="d-flex flex-row">
        <Container fluid className="mt-auto">
          <Row>
            <Col xs={12} sm={8} md={8} lg={6}>
              <h5>
                <a href={detailedSongDto.url} className="text-info">
                  {detailedSongDto.songTitle}
                </a>
              </h5>
            </Col>
            <Col className="d-none d-md-block" md={1} lg={1}>
              <div>{" by "}</div>
            </Col>
            <Col className="d-none d-sm-block" sm={4} md={3} lg={2}>
              <h5>
                <Link
                  className="text-info"
                  to={"/artists/" + detailedSongDto.artistId}
                >
                  {detailedSongDto.artistName}
                </Link>
              </h5>
            </Col>
            <Col className="d-none d-lg-block" lg={1}>
              <div>{" from "}</div>
            </Col>
            <Col className="d-none d-lg-block" lg={2}>
              <h5>
                <h5>
                  <Link
                    className="text-info"
                    to={"/albums/" + detailedSongDto.albumId}
                  >
                    {detailedSongDto.albumTitle}
                  </Link>
                </h5>
              </h5>
            </Col>
          </Row>
        </Container>

        <ButtonGroup className="ml-auto">
          <Button variant="outline-info" className="mr-2">
            Add
          </Button>
          <Button variant="outline-warning" onClick={() => removeFunction()}>
            Remove
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default DetailedSongComponent;
