import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AutosuggestComponent from "./AutosuggestComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import DetailedSongDto from "../Models/DetailedSongDto";

interface Props {
  playlistId: number;
}

function AddSongToPlaylistComponent({ playlistId }: Props) {
  const apiLink = "https://localhost:5001/api/";

  const [artistName, setArtistName] = useState<string>("");
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [songTitle, setSongTitle] = useState<string>("");

  const [songArray, setSongArray] = useState<DetailedSongDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiLink + "songs/detailed", config);

      setSongArray(result.data);
    };
    fetchData();
  }, [apiLink]);

  function AddFunction() {
    var song = {
      artist: artistName,
      album: albumTitle,
      song: songTitle,
    };
    console.log(song);
  }

  return (
    <Form className="d-flex flex-row ml-auto">
      <div className="mr-3">
        <AutosuggestComponent
          onValueChanged={(value: string) => setArtistName(value)}
          placeholder={"artist"}
          data={songArray.map((s) => s.artistName)}
        ></AutosuggestComponent>
      </div>
      <div className="mr-3">
        <AutosuggestComponent
          onValueChanged={(value: string) => setAlbumTitle(value)}
          placeholder={"album"}
          data={
            artistName === ""
              ? songArray.map((s) => s.albumTitle)
              : songArray.map((s) => {
                  if (s.artistName === artistName) return s.albumTitle;
                  else return "";
                })
          }
        ></AutosuggestComponent>
      </div>
      <div className="mr-3">
        <AutosuggestComponent
          onValueChanged={(value: string) => setSongTitle(value)}
          placeholder={"song"}
          data={
            albumTitle === ""
              ? songArray.map((s) => s.songTitle)
              : songArray.map((s) => {
                  if (s.albumTitle === albumTitle) return s.songTitle;
                  else return "";
                })
          }
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
