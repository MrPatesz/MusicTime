import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import DetailedSongDto from "../../Models/DetailedSongDto";
import { Config } from "../../config";
import SongDetails from "./SongDetails";

interface Props {
  detailedSongDto: DetailedSongDto;
  playlistId: number;
}

function PlaylistSongComponent({ detailedSongDto, playlistId }: Props) {
  const apiBase = Config.apiUrl;

  function removeFunction() {
    (async () => {
      await axios({
        method: "post",
        url: apiBase + "playlists/" + playlistId + "/removeSong",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        data: {
          Id: detailedSongDto.songId,
          Title: detailedSongDto.songTitle,
          Url: detailedSongDto.url,
        },
      });
    })();
  }

  return (
    <div className="mb-2">
      <div className="d-flex flex-row">
        <SongDetails detailedSongDto={detailedSongDto}></SongDetails>

        <ButtonGroup className="ml-auto">
          <Button variant="outline-warning" onClick={() => removeFunction()}>
            Remove
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default PlaylistSongComponent;
