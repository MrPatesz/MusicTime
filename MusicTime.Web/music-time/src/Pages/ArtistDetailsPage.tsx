import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import AlbumDto from "../Models/AlbumDto";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "../Components/CardComponent";
import Image from "react-bootstrap/Image";
import { useRouteMatch } from "react-router-dom";
import AddAlbumComponent from "../Components/AddAlbumComponent";
import Button from "react-bootstrap/Button";

function ArtistDetailsPage() {
  let id = useRouteMatch("/artists/:id").params.id;

  const apiLink = "https://localhost:5001/api/artists/" + id;

  const [artist, setArtist] = useState<ArtistDto>(new ArtistDto(0, "", "", ""));
  const [artistStillLoading, setArtistStillLoading] = useState<boolean>(true);

  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [albumsStillLoading, setAlbumsStillLoading] = useState<boolean>(true);

  const [showAddAlbum, setShowAddAlbum] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink, config);

      setArtist(
        new ArtistDto(
          result.data.id,
          result.data.name,
          result.data.description,
          result.data.pictureGuid
        )
      );
      setArtistStillLoading(false);
    };
    fetchData();
  }, [apiLink]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink + "/albums", config);

      let albumsArray: AlbumDto[] = [];

      result.data.forEach((album: AlbumDto) => {
        albumsArray.push(
          new AlbumDto(
            album.id,
            album.title,
            album.genre,
            album.description,
            album.releaseYear,
            album.coverGuid
          )
        );
      });
      setAlbums(albumsArray);
      setAlbumsStillLoading(false);
    };
    fetchData();
  }, [apiLink]);

  return (
    <div className="page">
      <div>
        {artistStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <Container fluid>
            <Row>
              <Col xs={12} sm={5} md={4} xl={3}>
                <Image
                  src={
                    artist.pictureGuid === null
                      ? "/placeholder.png"
                      : artist.pictureGuid
                  }
                  rounded
                  style={{ minWidth: "11rem", maxWidth: "14rem" }}
                  className="mt-3 mb-2"
                />
              </Col>
              <Col xs={12} sm={7} md={8} xl={9}>
                <h1>{artist.name}</h1>
                <div>
                  Description:{" "}
                  {artist.description === null
                    ? "Edit to add a description."
                    : artist.description}
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
      <div>
        <Container fluid>
          <Row>
            <h2>Albums</h2>
            <Button
              variant="outline-info"
              className="ml-auto"
              onClick={() => setShowAddAlbum(true)}
            >
              Add
            </Button>
          </Row>
        </Container>

        {albumsStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <Container fluid>
            <Row>
              {albums.map((a) => (
                <Col xs={6} sm={4} md={3} xl={2} key={a.id}>
                  <CardComponent
                    title={a.title}
                    pictureGuid={a.coverGuid}
                    deleteLink={"https://localhost:5001/api/albums/"}
                    linkTo="/albums/"
                    objectId={a.id}
                  ></CardComponent>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
      <AddAlbumComponent
        show={showAddAlbum}
        setShow={setShowAddAlbum}
      ></AddAlbumComponent>
    </div>
  );
}

export default ArtistDetailsPage;
