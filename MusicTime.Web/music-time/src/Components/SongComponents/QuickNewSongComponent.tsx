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
import DetailedSongDto from "../../Models/DetailedSongDto";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<any>>;
  detailedSongs: DetailedSongDto[];
}

function QuickNewSongComponent({ show, setShow, detailedSongs }: Props) {
  const [artistName, setArtistName] = useState<string>("");
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const createSong = useCreateSong();
  const createAlbum = useCreateAlbum();
  const createArtist = useCreateArtist();

  async function AddFunction() {
    if (!detailedSongs) return;

    var albumExists = detailedSongs.find((s) => s.albumTitle === albumTitle);
    var artistExists = detailedSongs.find((s) => s.artistName === artistName);

    if (albumExists) {
      createSong.mutate({
        title: songTitle,
        albumId: albumExists.albumId,
        url: url,
      });
    } else if (artistExists) {
      let newAlbum = await createAlbum.mutateAsync({
        title: albumTitle,
        artistId: artistExists.artistId,
        description: "",
        genre: "",
        releaseYear: -1,
      });
      createSong.mutate({
        title: songTitle,
        albumId: newAlbum.id,
        url: url,
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
        releaseYear: -1,
      });
      createSong.mutate({
        title: songTitle,
        albumId: newAlbum.id,
        url: url,
      });
    }
  }

  const [albumTitleArray, setAlbumTitleArray] = useState<string[]>([]);
  const [artistNameArray, setArtistNameArray] = useState<string[]>([]);

  useEffect(() => {
    const removeDuplicates = (array: string[]) =>
      array.filter((v, i) => array.indexOf(v) === i);

    function getArtistArray(): string[] {
      if (!detailedSongs) return [];

      let array = detailedSongs.map((s) => s.artistName);

      return removeDuplicates(array);
    }

    function getAlbumArray(): string[] {
      if (!detailedSongs) return [];

      let array =
        artistName === ""
          ? detailedSongs.map((s) => s.albumTitle)
          : detailedSongs
              .filter((s) => s.artistName === artistName)
              .map((s) => s.albumTitle);

      return removeDuplicates(array);
    }

    setArtistNameArray(getArtistArray());
    setAlbumTitleArray(getAlbumArray());
  }, [albumTitle, artistName, detailedSongs]);

  if (!show) return <div></div>;

  return (
    <div className="ml-auto">
      <Form className="d-flex flex-row ml-2 mr-4">
        <Container fluid>
          <Row>
            <Col xs={12} sm={8} lg={6}>
              <div className="d-flex flex-row">
                <input
                  className="form-control"
                  placeholder="title"
                  type="text"
                  onChange={(event) => setSongTitle(event.currentTarget.value)}
                ></input>
                <input
                  className="form-control"
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
              ></AutosuggestComponent>
            </Col>

            <Col className="d-none d-lg-block" lg={3}>
              <AutosuggestComponent
                onValueChanged={(value: string) => setAlbumTitle(value)}
                placeholder={"album"}
                data={albumTitleArray}
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
