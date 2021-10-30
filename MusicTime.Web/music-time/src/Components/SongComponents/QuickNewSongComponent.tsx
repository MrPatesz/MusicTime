import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AutosuggestComponent from "../Autosuggest/AutosuggestComponent";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCreateSong from "../../Hooks/Mutations/SongMutations/useCreateSong";
import useCreateAlbum from "../../Hooks/Mutations/AlbumMutations/useCreateAlbum";
import useCreateArtist from "../../Hooks/Mutations/ArtistMutations/useCreateArtist";
import { Container, Row, Col } from "react-bootstrap";
import useAlbums from "../../Hooks/Queries/AlbumQueries/useAlbums";
import useArtists from "../../Hooks/Queries/ArtistQueries/useArtists";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
}

function QuickNewSongComponent({ show, setShow }: Props) {
  const [artistName, setArtistName] = useState<string>("");
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const { data: albums } = useAlbums();
  const { data: artists } = useArtists();

  const createSong = useCreateSong();
  const createAlbum = useCreateAlbum(undefined);
  const createArtist = useCreateArtist();

  async function AddFunction() {
    if (!(albums && artists)) return;

    var albumExists = albums.find(
      (a) => a.title === albumTitle && a.artistName === artistName
    );
    var artistExists = artists.find((a) => a.name === artistName);

    if (albumExists) {
      createSong.mutate({
        title: songTitle,
        albumId: albumExists.id,
        url: url,
        albumIndex: 1,
      });
    } else if (artistExists) {
      let newAlbum = await createAlbum.mutateAsync({
        title: albumTitle,
        artistId: artistExists.id,
        description: "",
        genre: "",
        releaseYear: null,
      });
      createSong.mutate({
        title: songTitle,
        albumId: newAlbum.id,
        url: url,
        albumIndex: 1,
      });
    } else {
      let newArtist = await createArtist.mutateAsync({
        name: artistName,
        description: "",
      });
      let newAlbum = await createAlbum.mutateAsync({
        title: albumTitle,
        artistId: newArtist.id,
        description: "",
        genre: "",
        releaseYear: null,
      });
      await createSong.mutateAsync({
        title: songTitle,
        albumId: newAlbum.id,
        url: url,
        albumIndex: 1,
      });
    }
  }

  const [albumTitleArray, setAlbumTitleArray] = useState<string[]>([]);
  const [artistNameArray, setArtistNameArray] = useState<string[]>([]);

  useEffect(() => {
    function getArtistArray(): string[] {
      if (artists) {
        return artists.map((a) => a.name);
      } else {
        return [];
      }
    }

    function getAlbumArray(): string[] {
      if (albums) {
        return artistName === ""
          ? albums.map((a) => a.title)
          : albums
              .filter((a) => a.artistName === artistName)
              .map((s) => s.title);
      } else {
        return [];
      }
    }

    setArtistNameArray(getArtistArray());
    setAlbumTitleArray(getAlbumArray());
  }, [albumTitle, artistName, artists, albums]);

  if (!show) return <div></div>;

  return (
    <div>
      <Form className="d-flex flex-row mb-2 ml-2 mr-4">
        <Container fluid>
          <Row>
            <Col xs={12} sm={8} lg={6}>
              <div className="d-flex flex-row">
                <input
                  maxLength={50}
                  className="form-control"
                  placeholder="title"
                  type="text"
                  onChange={(event) => setSongTitle(event.currentTarget.value)}
                ></input>
                <input
                  className="form-control ml-2"
                  placeholder="url"
                  type="text"
                  onChange={(event) => setUrl(event.currentTarget.value)}
                ></input>
              </div>
            </Col>

            <Col className="d-none d-sm-block" sm={4} md={3}>
              <AutosuggestComponent
                onValueChanged={(value: string) => setArtistName(value)}
                placeholder={"artist"}
                data={artistNameArray}
                maxLength={50}
              ></AutosuggestComponent>
            </Col>

            <Col className="d-none d-lg-block" lg={3}>
              <AutosuggestComponent
                onValueChanged={(value: string) => setAlbumTitle(value)}
                placeholder={"album"}
                data={albumTitleArray}
                maxLength={50}
              ></AutosuggestComponent>
            </Col>
          </Row>
        </Container>

        <ButtonGroup style={{ height: "38px" }}>
          <Button
            title="Confirm"
            variant="outline-info"
            onClick={() => {
              AddFunction();
              setShow(false);
            }}
          >
            <FontAwesomeIcon icon="check" size="lg" />
          </Button>
          <Button
            className="ml-1"
            title="Cancel"
            variant="outline-secondary"
            onClick={() => setShow(false)}
          >
            <FontAwesomeIcon icon="times" size="lg" />
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}

export default QuickNewSongComponent;
