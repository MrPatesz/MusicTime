import { Button, Modal, Spinner } from "react-bootstrap";
import AutosuggestComponent from "../Autosuggest/AutosuggestComponent";
import PlaylistDto from "../../Models/PlaylistDto";
import SongDto from "../../Models/SongDto";
import { useState } from "react";
import usePlaylists from "../../Hooks/Queries/PlaylistQueries/usePlaylists";
import useAddSong from "../../Hooks/Mutations/PlaylistMutations/useAddSong";
import Alert from "react-bootstrap/Alert";

interface Props {
  showAdd: boolean;
  setShowAdd: (show: boolean) => void;
  songDto: SongDto;
}

function AddSongToPlaylistComponent({ showAdd, setShowAdd, songDto }: Props) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistDto>();
  const { data: playlists, error, isFetching } = usePlaylists();
  const addSongToPlaylist = useAddSong(setShowAdd);

  function onPlaylistChange(selected: string) {
    let playlist = playlists?.find((p) => p.title === selected);
    if (playlist) {
      setSelectedPlaylist(playlist);
    } else {
      setSelectedPlaylist(undefined);
    }
  }

  function addFunction() {
    if (selectedPlaylist) {
      addSongToPlaylist.mutate({
        songDto: songDto,
        playlistId: selectedPlaylist.id,
      });
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
        <Modal.Title>{'Add "' + songDto.title + '" to'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : playlists ? (
          <AutosuggestComponent
            placeholder="a playlist..."
            data={playlists.map((p) => p.title)}
            onValueChanged={onPlaylistChange}
            maxLength={50}
          ></AutosuggestComponent>
        ) : isFetching ? (
          <Spinner animation="grow" variant="info" />
        ) : (
          <div></div>
        )}
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
