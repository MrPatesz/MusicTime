import { useEffect, useState, useCallback } from "react";
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

  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [albumsStillLoading, setAlbumsStillLoading] = useState<boolean>(true);

  const [showAddAlbum, setShowAddAlbum] = useState<boolean>(false);
  const [showAddArtist, setShowAddArtist] = useState<boolean>(false);

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

  //source: https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-way
  const sendRequest = useCallback(async () => {
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
      setAlbumsStillLoading(false);
      setAlbums(albumsArray);
    };

    if (showAddAlbum) return; // don't send again while we are sending
    setShowAddAlbum(true); // update state
    fetchData(); // send the actual request
    setShowAddAlbum(false); // once the request is sent, update state again
  }, [showAddAlbum, apiLink]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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
              className="mt-3 mb-2 mr-4"
            />
            <div className="d-flex flex-column">
              <h1>{artist.name}</h1>
              <div>
                <h4>Description: </h4>
                <div className="w-100">
                  {artist.description === null
                    ? "Edit to add a description."
                    : artist.description}
                </div>
              </div>
            </div>

            <ButtonGroup className="ml-auto mt-3">
              <Button
                variant="outline-info"
                onClick={() => setShowAddArtist(true)}
                style={{ maxHeight: "3rem" }}
              >
                Edit
              </Button>
            </ButtonGroup>
          </div>
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
        artistId={id}
      ></AddAlbumComponent>

      <AddArtistComponent
        show={showAddArtist}
        setShow={setShowAddArtist}
        isEdited={true}
        editedArtist={artist}
      ></AddArtistComponent>
    </div>
  );
}

export default ArtistDetailsPage;
