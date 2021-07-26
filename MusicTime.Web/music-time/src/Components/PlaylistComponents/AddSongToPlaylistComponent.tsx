import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AutosuggestComponent from "../Autosuggest/AutosuggestComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import { Config } from "../../config";
import useDetailedSongs from "../../Hooks/useDetailedSongs";
import Alert from "react-bootstrap/Alert";
import { Spinner } from "react-bootstrap";

interface Props {
  playlistId: number;
}

function AddSongToPlaylistComponent({ playlistId }: Props) {
  const apiBase = Config.apiUrl;

  const [artistName, setArtistName] = useState<string>("");
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");

  const { data: detailedSongs, error, isFetching } = useDetailedSongs();

  function AddFunction() {
    if (!detailedSongs) return;

    var songDto = detailedSongs.find((s) => s.songTitle === songTitle);

    if (songDto) {
      (async () => {
        await axios({
          method: "post",
          url: apiBase + "playlists/" + playlistId + "/addSong",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: {
            Id: songDto.songId,
            Title: songDto.songTitle,
            Url: songDto.url,
          },
        });
      })();
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
        albumTitle === ""
          ? detailedSongs.map((s) => s.songTitle)
          : detailedSongs
              .filter((s) => s.albumTitle === albumTitle)
              .map((s) => s.songTitle);

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
          <div className="mr-3">
            <AutosuggestComponent
              onValueChanged={(value: string) => setArtistName(value)}
              placeholder={"artist"}
              data={artistNameArray}
            ></AutosuggestComponent>
          </div>
          <div className="mr-3">
            <AutosuggestComponent
              onValueChanged={(value: string) => setAlbumTitle(value)}
              placeholder={"album"}
              data={albumTitleArray}
            ></AutosuggestComponent>
          </div>
          <div className="mr-3">
            <AutosuggestComponent
              onValueChanged={(value: string) => setSongTitle(value)}
              placeholder={"song"}
              data={songTitleArray}
            ></AutosuggestComponent>
          </div>
          <ButtonGroup style={{ height: "38px" }}>
            <Button variant="outline-info" onClick={AddFunction}>
              Add
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
