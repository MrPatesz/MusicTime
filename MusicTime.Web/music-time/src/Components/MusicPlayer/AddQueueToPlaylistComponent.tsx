import { Button, Modal, Spinner, Toast } from "react-bootstrap";
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
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistDto>({
    id: -1,
    title: "",
    description: "",
    coverGuid: "",
  });
  const [showSuccessfulAdd, setShowSuccessfulAdd] = useState(false);
  const [playlistRequired, setPlaylistRequired] = useState<boolean>(false);

  const { data: playlists, error, isFetching } = usePlaylists();
  const addSongToPlaylist = useAddSong(setShowAdd);
  const createPlaylist = useCreatePlaylist();

  const queue = useSelector((state: RootState) => state.player.queue);

  function onPlaylistChange(selected: string) {
    let playlist = playlists?.find((p) => p.title === selected);
    if (playlist) {
      setSelectedPlaylist(playlist);
    } else {
      setSelectedPlaylist({
        id: -1,
        title: selected,
        description: "",
        coverGuid: "",
      });
    }
    if (selected) setPlaylistRequired(false);
  }

  async function addFunction() {
    if (selectedPlaylist.title) {
      if (selectedPlaylist.id === -1) {
        let createdPlaylist = await createPlaylist.mutateAsync({
          title: selectedPlaylist!.title,
          description: "",
        });
        saveQueueToPlaylist(createdPlaylist.id);
      } else {
        saveQueueToPlaylist(selectedPlaylist!.id);
      }
      setShowSuccessfulAdd(true);
    } else {
      setPlaylistRequired(true);
    }
  }

  async function saveQueueToPlaylist(playlistId: number) {
    queue.forEach(async (s) => {
      await addSongToPlaylist.mutateAsync({
        playlistId: playlistId,
        songDto: { id: s.songId, title: s.songTitle, url: s.url },
      });
    });
  }

  return (
    <div>
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
            <Alert variant="danger">
              An error occurred while fetching data!
            </Alert>
          ) : playlists ? (
            <div>
              <div className="w-100">
                <AutosuggestComponent
                  placeholder="new or existing playlist"
                  data={playlists.map((p) => p.title)}
                  onValueChanged={onPlaylistChange}
                  maxLength={50}
                />
              </div>
              {playlistRequired && (
                <div className="text-danger">Playlist is required</div>
              )}
            </div>
          ) : isFetching ? (
            <Spinner animation="grow" variant="info" />
          ) : (
            <div />
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

      <div style={{ position: "fixed", top: "10px", right: "10px" }}>
        <Toast
          className="bg-info"
          show={showSuccessfulAdd}
          onClose={() => setShowSuccessfulAdd(false)}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Successful add</strong>
            <small className="ml-auto" />
          </Toast.Header>
          <Toast.Body>
            Successfully added songs to "{selectedPlaylist?.title}"
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}

export default AddQueueToPlaylistComponent;
