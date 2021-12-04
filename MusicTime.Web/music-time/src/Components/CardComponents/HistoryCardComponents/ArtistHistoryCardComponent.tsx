import { Config } from "../../../config";
import useArtist from "../../../Hooks/Queries/ArtistQueries/useArtist";
import useArtistsSongs from "../../../Hooks/Queries/ArtistQueries/useArtistsSongs";
import DetailedSongDto from "../../../Models/DetailedSongDto";
import { useDispatch } from "react-redux";
import { setQueue } from "../../../redux/player";
import HistoryCardComponent from "../HistoryCardComponent";

interface Props {
  id: number;
}

function ArtistHistoryCardComponent({ id }: Props) {
  const dispatch = useDispatch();

  const { data: artist } = useArtist(id);
  const { data: artistsSongs } = useArtistsSongs(id);

  var picturePath: string | null | undefined = artist?.pictureGuid;
  var title: string | undefined = artist?.name;
  var relativeLink = "artists/" + id;

  if (picturePath === null) picturePath = "/placeholder.png";
  else {
    picturePath = Config.picturePath + picturePath + ".png";
  }

  function playFunction() {
    if (!(artistsSongs && artist)) return;
    let queue: DetailedSongDto[] = [];
    artistsSongs.forEach((s) =>
      queue.push(
        new DetailedSongDto(s.id, s.title, s.url, id, artist.name, 0, "")
      )
    );
    dispatch(setQueue(queue));
  }

  return (
    <HistoryCardComponent
      title={title ?? ""}
      relativeLink={relativeLink}
      picturePath={picturePath}
      playFunction={playFunction}
    />
  );
}

export default ArtistHistoryCardComponent;
