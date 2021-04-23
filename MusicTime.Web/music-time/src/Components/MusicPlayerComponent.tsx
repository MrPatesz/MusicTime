import ReactPlayer from "react-player";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function MusicPlayerComponent() {
  const [urlArray] = useState<string[]>([
    "https://www.youtube.com/watch?v=1givs65YWBg",
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
      className="d-flex flex-row"
      style={{ position: "absolute", bottom: "10px", right: "10px" }}
    >
      <div className="mt-auto">
        <div className="d-flex flex-column">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setVolume(parseFloat(e.currentTarget.value));
            }}
          />
          <ButtonGroup
            style={{ maxHeight: "3rem", backgroundColor: "#282c34" }}
          >
            <Button variant="outline-info" onClick={playPrevious}>
              Previous
            </Button>
            <Button variant="outline-info" onClick={() => setPlaying(!playing)}>
              {playing ? "Pause" : "Play"}
            </Button>
            <Button variant="outline-info" onClick={playNext}>
              Next
            </Button>
            <Button
              variant="outline-info"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Shrink" : "Expand"}
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <ReactPlayer
        url={urlArray[index]}
        controls={true}
        playing={playing}
        onEnded={playNext}
        width={expanded ? 640 : 320}
        height={expanded ? 360 : 180}
        volume={volume}
      />
    </div>
  );
}

export default MusicPlayerComponent;
