import { Config } from "../../../config";
import useAlbum from "../../../Hooks/Queries/AlbumQueries/useAlbum";
import useAlbumsSongs from "../../../Hooks/Queries/AlbumQueries/useAlbumsSongs";
import DetailedSongDto from "../../../Models/DetailedSongDto";
import { useDispatch } from "react-redux";
import { setQueue } from "../../../redux/player";
import HistoryCardComponent from "../HistoryCardComponent";

interface Props {
  id: number;
}

function AlbumHistoryCardComponent({ id }: Props) {
  const dispatch = useDispatch();

  const { data: album } = useAlbum(id);
  const { data: albumsSongs } = useAlbumsSongs(id);

  var picturePath: string | null | undefined = album?.coverGuid;
  var title: string | undefined = album?.title;
  var relativeLink = "albums/" + id;

  if (picturePath === null) picturePath = "/placeholder.png";
  else {
    picturePath = Config.picturePath + picturePath + ".png";
  }

  function playFunction() {
    if (!(albumsSongs && album)) return;
    let queue: DetailedSongDto[] = [];
    albumsSongs.forEach((s) =>
      queue.push(
        new DetailedSongDto(s.id, s.title, s.url, 0, "", id, album.title)
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
    ></HistoryCardComponent>
  );
}

export default AlbumHistoryCardComponent;
