import { Button, Modal, Spinner } from "react-bootstrap";
import AutosuggestComponent from "../Autosuggest/AutosuggestComponent";
import PlaylistDto from "../../Models/PlaylistDto";
import { useState } from "react";
import usePlaylists from "../../Hooks/Queries/PlaylistQueries/usePlaylists";
import useAddSong from "../../Hooks/Mutations/PlaylistMutations/useAddSong";
import useCreatePlaylist from "../../Hooks/Mutations/PlaylistMutations/useCreatePlaylist";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface Props {
  showAdd: boolean;
  setShowAdd: (show: boolean) => void;
}

function AddQueueToPlaylistComponent({ showAdd, setShowAdd }: Props) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistDto | null>(
    null
  );
  const { data: playlists, error, isFetching } = usePlaylists();
  const addSongToPlaylist = useAddSong(setShowAdd);
  const createPlaylist = useCreatePlaylist();
  const queue = useSelector((state: RootState) => state.player.queue);

  function onPlaylistChange(selected: string) {
    let playlist = playlists?.find((p) => p.title === selected);
    if (playlist) {
      setSelectedPlaylist(playlist);
    } else {
      setSelectedPlaylist(new PlaylistDto(-1, selected, "", ""));
    }
  }

  function addFunction() {
    if (selectedPlaylist && selectedPlaylist.title) {
      if (selectedPlaylist.id === -1) {
        saveQueueToNewPlaylist();
      } else {
        saveQueueToExistingPlaylist();
      }
    } else {
      alert("Please provide a title for the playlist!");
    }
  }

  async function saveQueueToNewPlaylist() {
    let createdPlaylist = await createPlaylist.mutateAsync({
      title: selectedPlaylist!.title,
      description: "",
    });
    queue.forEach(async (s) => {
      await addSongToPlaylist.mutateAsync({
        playlistId: createdPlaylist.id,
        songDto: { id: s.songId, title: s.songTitle, url: s.url},
      });
    });
  }

  async function saveQueueToExistingPlaylist() {
    queue.forEach(async (s) => {
      await addSongToPlaylist.mutateAsync({
        playlistId: selectedPlaylist!.id,
        songDto: { id: s.songId, title: s.songTitle, url: s.url },
      });
    });
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
        <Modal.Title>{"Add Queue to"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? (
          <Alert variant="danger">An error occurred while fetching data!</Alert>
        ) : playlists ? (
          <AutosuggestComponent
            placeholder="new or existing playlist"
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

export default AddQueueToPlaylistComponent;
