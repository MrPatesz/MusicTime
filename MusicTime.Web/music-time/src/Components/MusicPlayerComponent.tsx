import ReactPlayer from "react-player";
import { LegacyRef, RefObject, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DetailedSongDto from "../Models/DetailedSongDto";

interface Props {
  queue: DetailedSongDto[];
}

function MusicPlayerComponent({ queue }: Props) {
  const [index, setIndex] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
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

  const [scale, setScale] = useState<number>(1);

 // Hide, Q, Expand együtt
 // Prev, Play, Next együtt

  return (
    <div style={{ position: "fixed", bottom: "0", right: "0" }}>
      <div>
        {!hidden ? (
          <div className="d-flex flex-row bg-dark">
            <Button className="mt-auto" variant="outline-warning" onClick={() => setHidden(true)}>
              Hide
            </Button>
            {showQueue ? (
              <div
                className="overflow-auto bg-dark pl-2 pt-1 pb-1"
                style={{
                  height: "100%",
                  width: "200px",
                  position: "absolute",
                  left: "-200px",
                }}
              >
                <ul className="no-bullets">
                  {queue.map((s) => (
                    <div
                      key={s.songId}
                      className={
                        s.songId === queue[index].songId ? "text-info" : ""
                      }
                    >
                      {s.songTitle}
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <div></div>
            )}

            <div className="d-flex flex-column">
              <div className="d-flex flex-row m-2">
                <ReactPlayer
                  ref={playerRef}
                  url={
                    queue.length > 0
                      ? queue[index]
                        ? queue[index].url
                        : ""
                      : ""
                  }
                  playing={isPlaying}
                  onEnded={playNext}
                  width={expanded ? scale * 640 : 320}
                  height={expanded ? scale * 360 : 180}
                  volume={volume}
                  loop={false}
                  onPause={() => setIsPlaying(false)}
                  onStart={() => setIsPlaying(true)}
                  onPlay={() => setIsPlaying(true)}
                  onProgress={onProgress}
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
                <ButtonGroup className="mr-2">
                  <Button
                    variant="outline-info"
                    onClick={() => setShowQueue(!showQueue)}
                  >
                    Q
                  </Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <Button variant="outline-info" onClick={playPrevious}>
                    Prev
                  </Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <Button
                    variant="outline-info"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                </ButtonGroup>
                <ButtonGroup className="mr-2">
                  <Button variant="outline-info" onClick={playNext}>
                    Next
                  </Button>
                </ButtonGroup>
                <ButtonGroup className="mr-3">
                  <Button
                    variant="outline-info"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "Shrink" : "Expand"}
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            {expanded ? (
              <input
                className="vertical-slider mr-2 mb-2 mt-2"
                type="range"
                min={1}
                max={2.35}
                step="any"
                value={scale}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setScale(parseFloat(e.currentTarget.value));
                }}
              />
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <Button variant="outline-info" onClick={() => setHidden(false)}>
            Show Player
          </Button>
        )}
      </div>
    </div>
  );
}

export default MusicPlayerComponent;
