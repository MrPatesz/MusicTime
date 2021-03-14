import { useEffect, useState } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import AlbumDto from "../Models/AlbumDto";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import CardComponent from "../Components/CardComponent";

interface Props {
  artistId: number;
  setCurrentId: (id: number) => void;
}

function ArtistDetailsPage({ artistId, setCurrentId }: Props) {
  const apiLink = "https://localhost:5001/api/artists/" + artistId;

  const [artist, setArtist] = useState<ArtistDto>(new ArtistDto(0, "", "", ""));
  const [artistStillLoading, setArtistStillLoading] = useState<boolean>(true);

  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [albumsStillLoading, setAlbumsStillLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiLink);

      setArtistStillLoading(false);

      setArtist(
        new ArtistDto(
          result.data.id,
          result.data.name,
          result.data.description,
          result.data.pictureGuid
        )
      );
    };
    fetchData();
  }, [apiLink]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiLink + "/albums");

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

      // FOR TESTING
      albumsArray = albumsArray.concat(albumsArray);
      albumsArray = albumsArray.concat(albumsArray);
      // FOR TESTING

      setAlbums(albumsArray);
    };
    fetchData();
  }, [apiLink]);

  function deleteFunction(id: number) {
    var result = window.confirm("Are you sure you want to delete this album?");
    if (result) {
      const deleteCall = async () => {
        await axios.delete("https://localhost:5001/api/albums/" + id);
      };
      deleteCall();
    }
  }

  return (
    <div>
      <div>
        {artistStillLoading ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div>
            <h1>{artist.name}</h1>
            id:{artist.id}
          </div>
        )}
      </div>
      <div>
        <h2>Albums</h2>
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
                    deleteFunction={deleteFunction}
                    linkTo="albums/"
                    objectId={a.id}
                    setCurrentId={setCurrentId}
                  ></CardComponent>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default ArtistDetailsPage;
