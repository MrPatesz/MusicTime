import ReactPlayer from "react-player/lazy";
import { LegacyRef, RefObject, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import QueueComponent from "./QueueComponent";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { playPrevious, playNext, playRandom } from "../../redux/queue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MusicPlayerComponent() {
  const queue = useSelector((state: RootState) => state.queue.queue);
  const index = useSelector((state: RootState) => state.queue.index);
  const dispatch = useDispatch();

  const [volume, setVolume] = useState<number>(0.15);
  const [progress, setProgress] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.1);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(true);
  const [showQueue, setShowQueue] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);

  const playerRef = useRef<LegacyRef<ReactPlayer>>(
    null
  ) as RefObject<ReactPlayer>;

  function playPrevFunction() {
    setProgress(0);
    dispatch(playPrevious());
    setIsPlaying(true);
  }

  function playNextFunction() {
    setProgress(0);
    if (shuffle) {
      dispatch(playRandom());
    } else {
      dispatch(playNext());
    }

    setIsPlaying(true);
  }

  function onProgress(state: { played: number }) {
    if (!isSeeking) setProgress(state.played);
  }

  return (
    <div style={{ position: "fixed", bottom: "0", right: "0" }}>
      <div
        className={
          hidden ? "d-none" : "d-flex flex-row bg-dark border border-info"
        }
      >
        <QueueComponent show={showQueue} shuffle={shuffle} setShuffle={setShuffle}></QueueComponent>

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
                variant={showQueue ? "info" : "outline-info"}
                onClick={() => setShowQueue(!showQueue)}
              >
                <FontAwesomeIcon icon="list" />
              </Button>
            </ButtonGroup>

            <ButtonGroup className="mx-auto">
              <Button
                variant="outline-info"
                onClick={playPrevFunction}
                className="mr-2"
              >
                <FontAwesomeIcon icon="step-backward" />
              </Button>

              <Button
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

              <Button variant="outline-info" onClick={playNextFunction}>
                <FontAwesomeIcon icon="step-forward" />
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button variant="outline-warning" onClick={() => setHidden(true)}>
                <FontAwesomeIcon icon="eye-slash" />
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

      <Button
        variant="outline-info"
        onClick={() => setHidden(false)}
        className={hidden ? "m-2" : "d-none"}
      >
        <FontAwesomeIcon icon="eye" />
      </Button>
    </div>
  );
}

export default MusicPlayerComponent;
