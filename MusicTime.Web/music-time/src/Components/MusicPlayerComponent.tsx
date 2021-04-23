import ReactPlayer from "react-player";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function MusicPlayerComponent() {
  const [urlArray] = useState<string[]>([
    "https://www.youtube.com/watch?v=1givs65YWBg",
    "https://soundcloud.com/jahseh-onfroy/the-fall",
    "https://www.youtube.com/watch?v=lZ6hku1lbaQ",
    "https://soundcloud.com/miliy_10/toxic",
  ]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const [expanded, setExpanded] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.15);

  function playPrevious() {
    setIndex(index > 0 ? index - 1 : urlArray.length - 1);
    setPlaying(true);
  }

  function playNext() {
    setIndex(index < urlArray.length - 1 ? index + 1 : 0);
    setPlaying(true);
  }

  return (
    <div
      className="d-flex flex-column bg-dark"
      style={{ position: "fixed", bottom: "0", right: "0" }}
    >
      <div className="d-flex flex-row m-2">
        <ReactPlayer
          url={urlArray[index]}
          controls={true}
          playing={playing}
          onEnded={playNext}
          width={expanded ? 640 : 320}
          height={expanded ? 360 : 180}
          volume={volume}
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

      <div className="ml-auto mb-2">

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
            <Button
              variant="outline-info"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Shrink" : "Expand"}
            </Button>
          </ButtonGroup>

      </div>
    </div>
  );
}

export default MusicPlayerComponent;
