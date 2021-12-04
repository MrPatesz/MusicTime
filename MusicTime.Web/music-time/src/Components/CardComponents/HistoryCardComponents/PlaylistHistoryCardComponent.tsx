import { Config } from "../../../config";
import usePlaylist from "../../../Hooks/Queries/PlaylistQueries/usePlaylist";
import usePlaylistsSongs from "../../../Hooks/Queries/PlaylistQueries/usePlaylistsSongs";
import { useDispatch } from "react-redux";
import { setQueue } from "../../../redux/player";
import HistoryCardComponent from "../HistoryCardComponent";

interface Props {
  id: number;
}

function PlaylistHistoryCardComponent({ id }: Props) {
  const dispatch = useDispatch();

  const { data: playlist } = usePlaylist(id);
  const { data: playlistsSongs } = usePlaylistsSongs(id);

  var picturePath: string | null | undefined = playlist?.coverGuid;
  var title: string | undefined = playlist?.title;
  var relativeLink = "playlists/" + id;

  if (picturePath === null) picturePath = "/placeholder.png";
  else {
    picturePath = Config.picturePath + picturePath + ".png";
  }

  function playFunction() {
    if (!(playlistsSongs && playlist)) return;
    dispatch(setQueue(playlistsSongs));
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

export default PlaylistHistoryCardComponent;
