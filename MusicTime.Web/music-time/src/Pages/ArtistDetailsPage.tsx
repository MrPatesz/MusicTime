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
import AddArtistComponent from "../Components/AddArtistComponent";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function ArtistDetailsPage() {
  let id = useRouteMatch("/artists/:id").params.id;

  const apiLink = "https://localhost:5001/api/artists/" + id;

  const [artist, setArtist] = useState<ArtistDto>(new ArtistDto(0, "", "", ""));
  const [artistStillLoading, setArtistStillLoading] = useState<boolean>(true);

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

  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [albumsStillLoading, setAlbumsStillLoading] = useState<boolean>(true);

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

  const [showAddAlbum, setShowAddAlbum] = useState<boolean>(false);
  const [showEditArtist, setShowEditArtist] = useState<boolean>(false);

  return (
    <div className="page">
      <div>
        {artistStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div className="d-flex flex-row">
            <Image
              src={
                artist.pictureGuid === null
                  ? "/placeholder.png"
                  : artist.pictureGuid
              }
              rounded
              style={{ minWidth: "11rem", maxWidth: "14rem" }}
              className="mt-2 mb-2 mr-4"
            />
            <div className="d-flex flex-column">
              <h1>{artist.name}</h1>
              <p>{artist.description}</p>
            </div>

            <ButtonGroup className="ml-auto mt-3">
              <Button
                variant="outline-info"
                onClick={() => setShowEditArtist(true)}
                style={{ maxHeight: "3rem" }}
              >
                Edit
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
      <div>
        <div className="d-flex flex-row mb-3 mt-2">
          <h2>Albums</h2>
          <Button
            variant="outline-info"
            className="ml-auto"
            onClick={() => setShowAddAlbum(true)}
          >
            Add
          </Button>
        </div>

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
        artistId={id}
        isEdited={false}
        editedAlbum={new AlbumDto(0, "", null, null, null, null)}
      ></AddAlbumComponent>

      <AddArtistComponent
        show={showEditArtist}
        setShow={setShowEditArtist}
        isEdited={true}
        editedArtist={artist}
      ></AddArtistComponent>
    </div>
  );
}

export default ArtistDetailsPage;
