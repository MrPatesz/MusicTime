import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AutosuggestComponent from "./AutosuggestComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import DetailedSongDto from "../Models/DetailedSongDto";
import { Config } from "../config";

interface Props {
  playlistId: number;
}

function AddSongToPlaylistComponent({ playlistId }: Props) {
  const apiLink = Config.apiUrl;

  const [artistName, setArtistName] = useState<string>("");
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");

  const [songDtoArray, setSongDtoArray] = useState<DetailedSongDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink + "songs/detailed", config);

      setSongDtoArray(result.data);
    };
    fetchData();
  }, [apiLink, artistName]);

  function AddFunction() {
    var songDto = songDtoArray.find((s) => s.songTitle === songTitle);

    if (songDto !== undefined && songDto !== null) {
      const postData = async () => {
        await axios({
          method: "post",
          url:
            "https://localhost:5001/api/playlists/" + playlistId + "/addSong",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: {
            Id: songDto?.songId,
            Title: songDto?.songTitle,
            Url: songDto?.url,
          },
        });
      };
      postData();
    }
  }

  const [songTitleArray, setSongTitleArray] = useState<string[]>([]);
  const [albumTitleArray, setAlbumTitleArray] = useState<string[]>([]);
  const [artistNameArray, setArtistNameArray] = useState<string[]>([]);

  useEffect(() => {
    const removeDuplicates = (array: string[]) =>
      array.filter((v, i) => array.indexOf(v) === i);

    function getArtistArray(): string[] {
      let array = songDtoArray.map((s) => s.artistName);

      return removeDuplicates(array);
    }

    function getAlbumArray(): string[] {
      let array =
        artistName === ""
          ? songDtoArray.map((s) => s.albumTitle)
          : songDtoArray
              .filter((s) => s.artistName === artistName)
              .map((s) => s.albumTitle);

      return removeDuplicates(array);
    }

    function getSongArray(): string[] {
      let array =
        albumTitle === ""
          ? songDtoArray.map((s) => s.songTitle)
          : songDtoArray
              .filter((s) => s.albumTitle === albumTitle)
              .map((s) => s.songTitle);

      return removeDuplicates(array);
    }

    setArtistNameArray(getArtistArray());

    setAlbumTitleArray(getAlbumArray());

    setSongTitleArray(getSongArray());
  }, [albumTitle, artistName, songDtoArray]);

  return (
    <Form className="d-flex flex-row ml-auto">
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
  );
}

export default AddSongToPlaylistComponent;
