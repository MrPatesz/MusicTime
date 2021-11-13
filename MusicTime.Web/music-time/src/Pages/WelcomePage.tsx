import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQueue } from "../redux/player";
import { Link } from "react-router-dom";
import MusicPlayerComponent from "../Components/MusicPlayer/MusicPlayerComponent";

function WelcomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const defaultQueue = [
      {
        songId: 106,
        songTitle: "The Explanation",
        url: "https://www.youtube.com/watch?v=pG-tbrzlMVU",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 29,
        songTitle: "Jocelyn Flores",
        url: "https://www.youtube.com/watch?v=FAucVNRx_mU",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 107,
        songTitle: "Depression & Obsession",
        url: "https://www.youtube.com/watch?v=yas2vpTPWWY",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 104,
        songTitle: "Everybody Dies In Their Nightmares",
        url: "https://www.youtube.com/watch?v=7JGDWKJfgxQ",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 108,
        songTitle: "Revenge",
        url: "https://www.youtube.com/watch?v=CD_tD26E7k0",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 32,
        songTitle: "Save Me",
        url: "https://www.youtube.com/watch?v=-8xdDaRFdwc",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 109,
        songTitle: "Dead Inside (Interlude)",
        url: "https://www.youtube.com/watch?v=UgZyhGU8r04",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 110,
        songTitle: "Fuck Love (ft. Trippie Redd)",
        url: "https://www.youtube.com/watch?v=JcWOSgImiRw",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 111,
        songTitle: "Carry On",
        url: "https://www.youtube.com/watch?v=EhTH8OIPoY4",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 112,
        songTitle: "Orlando",
        url: "https://www.youtube.com/watch?v=cnNfYsfyiMc",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
      {
        songId: 113,
        songTitle: "Ayala (Outro)",
        url: "https://www.youtube.com/watch?v=KbxlSQVWbDw",
        artistId: 0,
        artistName: "xxxtentacion",
        albumId: 1,
        albumTitle: "17",
      },
    ];
    dispatch(setQueue(defaultQueue));
  }, [dispatch]);

  return (
    <div className="welcome-page">
      <h1 className="my-3 d-flex flex-row justify-content-center my-4">
        Welcome to&nbsp;
        <div className="text-info">Music Time</div>
      </h1>

      <div className="my-3 d-flex flex-row justify-content-center">
        <div className="mr-4">
          <div className="d-flex flex-row justify-content-center">
            <p>
              Manage your favourite artists, albums, songs and create playlists.
            </p>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <p>
              Play music from various sources, including SoundCloud, YouTube,
              mp3 files and many more.
            </p>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <h5>
              Head over to the{" "}
              <Link class="text-info" to="login">
                Login page
              </Link>{" "}
              to create an account.
            </h5>
          </div>
        </div>
      </div>

      <MusicPlayerComponent disableQueuetoPlaylist={true} />
    </div>
  );
}

export default WelcomePage;
