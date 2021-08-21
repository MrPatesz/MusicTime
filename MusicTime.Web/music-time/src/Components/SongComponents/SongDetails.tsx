import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import DetailedSongDto from "../../Models/DetailedSongDto";

interface Props {
  detailedSongDto: DetailedSongDto;
}

function SongDetails({ detailedSongDto }: Props) {
  return (
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
  );
}

export default SongDetails;
