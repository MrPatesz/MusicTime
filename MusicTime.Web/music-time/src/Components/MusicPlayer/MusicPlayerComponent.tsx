import ReactPlayer from "react-player";
import { LegacyRef, RefObject, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DetailedSongDto from "../../Models/DetailedSongDto";
import QueueComponent from "./QueueComponent";

interface Props {
  queue: DetailedSongDto[];
  setQueue: React.Dispatch<React.SetStateAction<DetailedSongDto[]>>;
}

function MusicPlayerComponent({ queue, setQueue }: Props) {
  const [index, setIndex] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.15);
  const [progress, setProgress] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const [hidden, setHidden] = useState<boolean>(false);

  function playPrevious() {
    setProgress(0);
    setIndex(index > 0 ? index - 1 : queue.length - 1);
    setIsPlaying(true);
  }

  function playNext() {
    setProgress(0);
    setIndex(index < queue.length - 1 ? index + 1 : 0);
    setIsPlaying(true);
  }

  const playerRef = useRef<LegacyRef<ReactPlayer>>(
    null
  ) as RefObject<ReactPlayer>;

  const [showQueue, setShowQueue] = useState<boolean>(false);

  function onProgress(state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) {
    if (!isSeeking) setProgress(state.played);
  }

  const [scale, setScale] = useState<number>(1.15);

  return (
    <div style={{ position: "fixed", bottom: "0", right: "0" }}>
      {!hidden ? (
        <div className="d-flex flex-row bg-dark border border-info">
          <QueueComponent
            queue={queue}
            setQueue={setQueue}
            index={index}
            setIndex={setIndex}
            show={showQueue}
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
                onEnded={playNext}
                onError={playNext}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onProgress={onProgress}
                onStart={() => setIsPlaying(true)}
              />

              <input
                className="vertical-slider ml-2"
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setVolume(parseFloat(e.currentTarget.value));
                }}
              />
            </div>

            <input
              className="mr-4 ml-2"
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

            <div className="ml-auto mb-2 mt-2">
              <ButtonGroup>
                <Button
                  className="mr-2"
                  variant="outline-warning"
                  onClick={() => setHidden(true)}
                >
                  Hide
                </Button>

                <Button
                  className="mr-2"
                  variant="outline-info"
                  onClick={() => setShowQueue(!showQueue)}
                >
                  Queue
                </Button>
              </ButtonGroup>

              <ButtonGroup className="ml-4">
                <Button
                  variant="outline-info"
                  onClick={playPrevious}
                  className="mr-2"
                >
                  Prev
                </Button>

                <Button
                  className="mr-2"
                  variant="outline-info"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>

                <Button
                  variant="outline-info"
                  onClick={playNext}
                  className="mr-4"
                >
                  Next
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <input
            className="vertical-slider mr-2 mb-2 mt-2"
            type="range"
            min={1.15}
            max={4.7}
            step="any"
            value={scale}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setScale(parseFloat(e.currentTarget.value));
              console.log(e.currentTarget.value);
            }}
          />
        </div>
      ) : (
        <Button
          variant="outline-info"
          onClick={() => setHidden(false)}
          className="m-2"
        >
          Show Player
        </Button>
      )}
    </div>
  );
}

export default MusicPlayerComponent;
