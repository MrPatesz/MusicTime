import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DetailedSongDto from "../../Models/DetailedSongDto";
import SongDetails from "./SongDetails";
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
    <div className="mb-2">
      <div className="d-flex flex-row">
        <SongDetails detailedSongDto={detailedSongDto}></SongDetails>

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
    </div>
  );
}

export default PlaylistSongComponent;
