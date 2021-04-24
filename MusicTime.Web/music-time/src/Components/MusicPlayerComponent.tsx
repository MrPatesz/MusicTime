import ReactPlayer from "react-player";
import { LegacyRef, RefObject, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface Props {
  urlArray: string[];
}

function MusicPlayerComponent({ urlArray }: Props) {
  const [index, setIndex] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.15);
  const [progress, setProgress] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  function playPrevious() {
    setProgress(0);
    setIndex(index > 0 ? index - 1 : urlArray.length - 1);
    setIsPlaying(true);
  }

  function playNext() {
    setProgress(0);
    setIndex(index < urlArray.length - 1 ? index + 1 : 0);
    setIsPlaying(true);
  }

  const playerRef = useRef<LegacyRef<ReactPlayer>>(
    null
  ) as RefObject<ReactPlayer>;

  return (
    <div
      className="d-flex flex-column bg-dark"
      style={{ position: "fixed", bottom: "0", right: "0" }}
    >
      <div className="d-flex flex-row m-2">
        <ReactPlayer
          ref={playerRef}
          url={urlArray[index]}
          playing={isPlaying}
          onEnded={playNext}
          width={expanded ? 640 : 320}
          height={expanded ? 360 : 180}
          volume={volume}
          loop={false}
          onPause={() => setIsPlaying(false)}
          onStart={() => setIsPlaying(true)}
          onPlay={() => setIsPlaying(true)}
          onProgress={(state: {
            played: number;
            playedSeconds: number;
            loaded: number;
            loadedSeconds: number;
          }) => {
            if (!isSeeking) setProgress(state.played);
          }}
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
          <Button variant="outline-info" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Shrink" : "Expand"}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default MusicPlayerComponent;
