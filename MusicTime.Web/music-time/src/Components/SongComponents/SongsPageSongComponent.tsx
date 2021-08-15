import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DetailedSongDto from "../../Models/DetailedSongDto";
import SongDto from "../../Models/SongDto";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import SongDetails from "./SongDetails";
import AddToPlaylistComponent from "./AddToPlaylistComponent";
import useDeleteSong from "../../Hooks/Mutations/SongMutations/useDeleteSong";

interface Props {
  detailedSongDto: DetailedSongDto;
}

function SongsPageSongComponent({ detailedSongDto }: Props) {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const deleteSong = useDeleteSong("detailedSongs");

  function deleteFunction() {
    deleteSong.mutate(detailedSongDto.songId);
    setConfirm(false);
  }

  return (
    <div className="mb-2">
      <div className="d-flex flex-row">
        <SongDetails detailedSongDto={detailedSongDto}></SongDetails>

        <ButtonGroup className="ml-auto">
          <Button
            variant="outline-info"
            className="mr-1"
            onClick={() => setShowAdd(true)}
          >
            Add
          </Button>
          <Button variant="outline-danger" onClick={() => setConfirm(true)}>
            Delete
          </Button>
        </ButtonGroup>

        <Modal
          show={confirm}
          onHide={() => setConfirm(false)}
          backdrop="static"
          keyboard={false}
          animation={false}
        >
          <Modal.Header>
            <Modal.Title>Deleting item</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="outline-danger" onClick={() => deleteFunction()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <AddToPlaylistComponent
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          songDto={
            new SongDto(
              detailedSongDto.songId,
              detailedSongDto.songTitle,
              detailedSongDto.url
            )
          }
        ></AddToPlaylistComponent>
      </div>
    </div>
  );
}

export default SongsPageSongComponent;
