import ReactPlayer from "react-player";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function MusicPlayerComponent() {
  const [index, setIndex] = useState<number>(0);
  const [urlArray] = useState<string[]>([
    "https://www.youtube.com/watch?v=1givs65YWBg",
    "https://soundcloud.com/jahseh-onfroy/the-fall",
    "https://www.youtube.com/watch?v=lZ6hku1lbaQ",
    "https://soundcloud.com/miliy_10/toxic",
  ]);

  const [playing, setPlaying] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.15);
  const [seek, setSeek] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);

  function playPrevious() {
    setIndex(index > 0 ? index - 1 : urlArray.length - 1);
    setPlaying(true);
  }

  function playNext() {
    setIndex(index < urlArray.length - 1 ? index + 1 : 0);
    setPlaying(true);
  }

  const [player, setPlayer] = useState<any>();

  function ref(player: any) {
    setPlayer(player);
  }

  return (
    <div
      className="d-flex flex-column bg-dark"
      style={{ position: "fixed", bottom: "0", right: "0" }}
    >
      <div className="d-flex flex-row m-2">
        <ReactPlayer
          ref={ref}
          url={urlArray[index]}
          playing={playing}
          onEnded={playNext}
          width={expanded ? 640 : 320}
          height={expanded ? 360 : 180}
          volume={volume}
          loop={false}
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
        value={seek}
        onMouseDown={() => setSeeking(true)}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setSeek(parseFloat(e.currentTarget.value))
        }
        onMouseUp={(e: React.FormEvent<HTMLInputElement>) => {
          setSeeking(false);
          player.seekTo(parseFloat(e.currentTarget.value));
        }}
      />

      <div className="ml-auto mb-2 mt-2">
        <ButtonGroup className="mr-2">
          <Button variant="outline-info" onClick={playPrevious}>
            Previous
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button variant="outline-info" onClick={() => setPlaying(!playing)}>
            {playing ? "Pause" : "Play"}
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
