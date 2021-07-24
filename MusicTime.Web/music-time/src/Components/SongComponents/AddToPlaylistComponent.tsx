import { Button, Modal } from "react-bootstrap";
import AutosuggestComponent from "../Autosuggest/AutosuggestComponent";
import PlaylistDto from "../../Models/PlaylistDto";
import SongDto from "../../Models/SongDto";
import axios from "axios";
import { Config } from "../../config";
import { useEffect, useState } from "react";

interface Props {
  showAdd: boolean;
  setShowAdd: (show: boolean) => void;
  songDto: SongDto;
}

function AddSongToPlaylistComponent({
  showAdd,
  setShowAdd,
  songDto,
}: Props) {
  const apiBase = Config.apiUrl;

  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistDto>();
  const [playlists, setPlaylists] = useState<PlaylistDto[]>([]);

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const result = await axios.get(apiBase + "playlists/", config);

      setPlaylists(result.data);
    })();
  }, [apiBase]);

  function onPlaylistChange(selected: string) {
    let playlist = playlists.find((p) => p.title === selected);
    if (playlist) {
      setSelectedPlaylist(playlist);
    } else {
      setSelectedPlaylist(undefined);
    }
  }

  function addFunction() {
    if (selectedPlaylist) {
      (async () => {
        await axios({
          method: "post",
          url: apiBase + "playlists/" + selectedPlaylist.id + "/addSong",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          data: songDto,
        });
      })();
      setShowAdd(false);
    } else {
      alert("Playlist does not exist!");
    }
  }

  return (
    <Modal
      show={showAdd}
      onHide={() => setShowAdd(false)}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Header>
        <Modal.Title>
          {'Add "' + songDto.title + '" to'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutosuggestComponent
          placeholder="a playlist..."
          data={playlists.map((p) => p.title)}
          onValueChanged={onPlaylistChange}
        ></AutosuggestComponent>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => setShowAdd(false)}>
          Cancel
        </Button>
        <Button variant="outline-info" onClick={() => addFunction()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSongToPlaylistComponent;
