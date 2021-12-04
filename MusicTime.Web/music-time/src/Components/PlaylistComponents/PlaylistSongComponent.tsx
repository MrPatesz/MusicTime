import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DetailedSongDto from "../../Models/DetailedSongDto";
import SongDetails from "../SongComponents/SongDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useRemoveSong from "../../Hooks/Mutations/PlaylistMutations/useRemoveSong";
import SongDto from "../../Models/SongDto";

interface Props {
  detailedSongDto: DetailedSongDto;
  playlistId: number;
}

function PlaylistSongComponent({ detailedSongDto, playlistId }: Props) {
  const removeSong = useRemoveSong();

  function removeFunction() {
    removeSong.mutate({
      songDto: new SongDto(
        detailedSongDto.songId,
        detailedSongDto.songTitle,
        detailedSongDto.url
      ),
      playlistId: playlistId,
    });
  }

  return (
    <div className="d-flex flex-row mb-2 ml-2 mr-4">
      <SongDetails detailedSongDto={detailedSongDto} />

      <ButtonGroup className="ml-auto">
        <Button
          title="Remove from playlist"
          variant="outline-warning"
          onClick={() => removeFunction()}
        >
          <FontAwesomeIcon icon="trash-alt" size="lg" />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default PlaylistSongComponent;
