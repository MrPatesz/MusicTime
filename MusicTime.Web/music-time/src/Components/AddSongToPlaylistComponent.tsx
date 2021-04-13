import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AutosuggestComponent from "./AutosuggestComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import ArtistDto from "../Models/ArtistDto";
import AlbumDto from "../Models/AlbumDto";
import SongDto from "../Models/SongDto";

interface Props {
  playlistId: number;
}

function AddSongToPlaylistComponent({ playlistId }: Props) {
  const apiLink = "https://localhost:5001/api/";

  const [artistStringArray, setArtistStringArray] = useState<string[]>([]);
  const [albumStringArray, setAlbumStringArray] = useState<string[]>([]);
  const [songStringArray, setSongStringArray] = useState<string[]>([]);

  const [artistName, setArtistName] = useState<string>("");
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink + "artists", config);

      setArtistStringArray(result.data.map((a: ArtistDto) => a.name));
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
      const result = await axios.get(apiLink + "albums", config);

      setAlbumStringArray(result.data.map((a: AlbumDto) => a.title));
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
      const result = await axios.get(apiLink + "songs", config);

      setSongStringArray(result.data.map((s: SongDto) => s.title));
    };
    fetchData();
  }, [apiLink]);

  function AddFunction() {
    var song = {
      artist: artistName,
      album: albumTitle,
      song: songTitle,
    };
  }

  return (
    <Form className="d-flex flex-row ml-auto">
      <div className="mr-3">
        <AutosuggestComponent
          onSuggestionSelected={(value: string) => setArtistName(value)}
          onSuggestionAreaCleared={() => setArtistName("")}
          placeholder={"artist"}
          data={artistStringArray}
        ></AutosuggestComponent>
      </div>
      <div className="mr-3">
        <AutosuggestComponent
          onSuggestionSelected={(value: string) => setAlbumTitle(value)}
          onSuggestionAreaCleared={() => setAlbumTitle("")}
          placeholder={"album"}
          data={albumStringArray}
        ></AutosuggestComponent>
      </div>
      <div className="mr-3">
        <AutosuggestComponent
          onSuggestionSelected={(value: string) => setSongTitle(value)}
          onSuggestionAreaCleared={() => setSongTitle("")}
          placeholder={"song"}
          data={songStringArray}
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
