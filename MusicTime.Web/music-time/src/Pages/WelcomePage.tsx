import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LegacyRef, RefObject, useRef, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import ReactPlayer from "react-player";
import QueueComponent from "../Components/MusicPlayer/QueueComponent";
import { useDispatch, useSelector } from "react-redux";
import { playNext, playPrevious, setQueue } from "../redux/player";
import { RootState } from "../redux/store";

function WelcomePage() {
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

  const dispatch = useDispatch();
  dispatch(setQueue(defaultQueue));

  const queue = useSelector((state: RootState) => state.queue.queue);
  const index = useSelector((state: RootState) => state.queue.index);

  const [volume, setVolume] = useState<number>(0.15);
  const [progress, setProgress] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.1);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [showQueue, setShowQueue] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<boolean>(false);

  const playerRef = useRef<LegacyRef<ReactPlayer>>(
    null
  ) as RefObject<ReactPlayer>;

  function playPrevFunction() {
    setProgress(0);
    if (!repeat) {
      dispatch(playPrevious());
    } else {
      playerRef?.current?.seekTo(0);
    }
  }

  function playNextFunction() {
    setProgress(0);
    if (repeat) {
      dispatch(playNext());
      dispatch(playPrevious());
    } else {
      dispatch(playNext());
    }
  }

  function onProgress(state: { played: number }) {
    if (!isSeeking) setProgress(state.played);
  }

  return (
    <div>
      <h1>Welcome</h1>

      <div
        style={{ position: "fixed", bottom: "0", right: "0" }}
        className="d-flex flex-row bg-dark border border-info"
      >
        <QueueComponent
          show={showQueue}
          repeat={repeat}
          setRepeat={setRepeat}
        ></QueueComponent>

        <div className="d-flex flex-column">
          <div className="d-flex flex-row m-2">
            <ReactPlayer
              ref={playerRef}
              url={
                queue.length > 0 ? (queue[index] ? queue[index].url : "") : ""
              }
              playing={isPlaying}
              width={scale * 320}
              height={scale * 180}
              volume={volume}
              loop={false}
              onEnded={playNextFunction}
              onError={playNextFunction}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onProgress={onProgress}
              onStart={() => setIsPlaying(true)}
            />
          </div>

          <input
            className="mx-2 horizontal-slider"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={progress}
            onMouseDown={() => setIsSeeking(true)}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setProgress(parseFloat(e.currentTarget.value))
            }
            onMouseUp={(e: React.FormEvent<HTMLInputElement>) => {
              setIsSeeking(false);
              playerRef?.current?.seekTo(parseFloat(e.currentTarget.value));
            }}
          />

          <div className="m-2 d-flex flex-row">
            <ButtonGroup>
              <Button
                title={showQueue ? "Hide Queue" : "Show Queue"}
                variant={showQueue ? "info" : "outline-info"}
                onClick={() => setShowQueue(!showQueue)}
              >
                <FontAwesomeIcon icon="list" />
              </Button>
            </ButtonGroup>

            <ButtonGroup className="mx-auto">
              <Button
                title="Play previous"
                variant="outline-info"
                onClick={playPrevFunction}
                className="mr-2"
              >
                <FontAwesomeIcon icon="step-backward" />
              </Button>

              <Button
                title={isPlaying ? "Pause" : "Play"}
                className="mr-2"
                variant="outline-info"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <FontAwesomeIcon icon="pause" />
                ) : (
                  <FontAwesomeIcon icon="play" />
                )}
              </Button>

              <Button
                title="Play next"
                variant="outline-info"
                onClick={() => {
                  if (repeat) setRepeat(false);
                  playerRef?.current?.seekTo(0.999999);
                }}
              >
                <FontAwesomeIcon icon="step-forward" />
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="d-flex flex-row mt-auto mb-2 mr-2 text-info">
          <div className="d-flex flex-column mr-2">
            <FontAwesomeIcon icon="volume-up" />
            <input
              className="vertical-slider my-2"
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setVolume(parseFloat(e.currentTarget.value));
              }}
            />
            <FontAwesomeIcon icon="volume-down" />
          </div>
          <div className="d-flex flex-column">
            <FontAwesomeIcon icon="expand" />
            <input
              className="vertical-slider my-2"
              type="range"
              min={1.1}
              max={4.7}
              step="any"
              value={scale}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setScale(parseFloat(e.currentTarget.value))
              }
            />
            <FontAwesomeIcon icon="compress" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
