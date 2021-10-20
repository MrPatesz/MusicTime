import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AutosuggestComponent from "../Autosuggest/AutosuggestComponent";
import { useState, useEffect } from "react";
import useDetailedSongs from "../../Hooks/Queries/SongQueries/useDetailedSongs";
import Alert from "react-bootstrap/Alert";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAddSong from "../../Hooks/Mutations/PlaylistMutations/useAddSong";

interface Props {
  playlistId: number;
}

function AddSongToPlaylistComponent({ playlistId }: Props) {
  const [artistName, setArtistName] = useState<string>("");
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");

  const { data: detailedSongs, error, isFetching } = useDetailedSongs();
  const addSong = useAddSong(() => { });

  function AddFunction() {
    if (!detailedSongs) return;

    var detailedSongDto = detailedSongs.find(
      (s) => s.songTitle === songTitle
        && (s.albumTitle === albumTitle || albumTitle === "")
        && (s.artistName === artistName || artistName === "")
    );

    if (detailedSongDto) {
      addSong.mutate({
        songDto: {
          id: detailedSongDto.songId,
          title: detailedSongDto.songTitle,
          url: detailedSongDto.url,
        },
        playlistId: playlistId,
      });
    }
  }

  const [songTitleArray, setSongTitleArray] = useState<string[]>([]);
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

    function getSongArray(): string[] {
      if (!detailedSongs) return [];

      let array =
        albumTitle !== ""
          ? detailedSongs
            .filter((s) => s.albumTitle === albumTitle)
            .map((s) => s.songTitle)
          : artistName !== ""
            ? detailedSongs
              .filter((s) => s.artistName === artistName)
              .map((s) => s.songTitle)
            : detailedSongs.map((s) => s.songTitle);

      return removeDuplicates(array);
    }

    setArtistNameArray(getArtistArray());
    setAlbumTitleArray(getAlbumArray());
    setSongTitleArray(getSongArray());
  }, [albumTitle, artistName, detailedSongs]);

  return (
    <div className="ml-auto">
      {error ? (
        <Alert variant="danger">An error occurred while fetching data!</Alert>
      ) : detailedSongs ? (
        <Form className="d-flex flex-row">
          <div className="d-none d-md-block mr-3">
            <AutosuggestComponent
              onValueChanged={(value: string) => setArtistName(value)}
              placeholder={"artist"}
              data={artistNameArray}
              maxLength={50}
            ></AutosuggestComponent>
          </div>
          <div className="d-none d-lg-block mr-3">
            <AutosuggestComponent
              onValueChanged={(value: string) => setAlbumTitle(value)}
              placeholder={"album"}
              data={albumTitleArray}
              maxLength={50}
            ></AutosuggestComponent>
          </div>
          <div className="mr-3">
            <AutosuggestComponent
              onValueChanged={(value: string) => setSongTitle(value)}
              placeholder={"song"}
              data={songTitleArray}
              maxLength={50}
            ></AutosuggestComponent>
          </div>
          <ButtonGroup style={{ height: "38px" }}>
            <Button
              title="Add song to playlist"
              variant="outline-info"
              onClick={AddFunction}
            >
              <FontAwesomeIcon icon="plus" size="lg" />
            </Button>
          </ButtonGroup>
        </Form>
      ) : isFetching ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AddSongToPlaylistComponent;
