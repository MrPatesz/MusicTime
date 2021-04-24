import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import AlbumDto from "../Models/AlbumDto";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "../Components/CardComponent";
import Image from "react-bootstrap/Image";
import { useRouteMatch } from "react-router-dom";
import NewAlbumComponent from "../Components/NewAlbumComponent";
import NewArtistComponent from "../Components/NewArtistComponent";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DetailedSongDto from "../Models/DetailedSongDto";

interface Props {
  setQueue: React.Dispatch<React.SetStateAction<DetailedSongDto[]>>;
}

function ArtistDetailsPage({ setQueue }: Props) {
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

      setArtist(result.data);
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

      setAlbums(result.data);
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
              className="mb-2 mr-4"
            />
            <div className="d-flex flex-column">
              <h1>{artist.name}</h1>
              <p>{artist.description}</p>
            </div>

            <ButtonGroup className="ml-auto">
              <Button
                variant="outline-info"
                onClick={() => setShowEditArtist(true)}
                className="mb-auto"
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
            className="ml-auto mt-auto mb-auto"
            onClick={() => setShowAddAlbum(true)}
          >
            New
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
      <NewAlbumComponent
        show={showAddAlbum}
        setShow={setShowAddAlbum}
        artistId={id}
        isEdited={false}
        editedAlbum={new AlbumDto(0, "", null, null, null, null)}
      ></NewAlbumComponent>

      <NewArtistComponent
        show={showEditArtist}
        setShow={setShowEditArtist}
        isEdited={true}
        editedArtist={artist}
      ></NewArtistComponent>
    </div>
  );
}

export default ArtistDetailsPage;
