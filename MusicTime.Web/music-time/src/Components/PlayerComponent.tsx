import ReactPlayer from "react-player/youtube";
import { useState } from "react";

function PlayerComponent() {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/watch?v=1givs65YWBg"
  );
  const [playing, setPlaying] = useState<boolean>(false);

  return (
    <ReactPlayer
      url={url}
      controls={true}
      playing={playing}
      onEnded={() => {
        setUrl("https://www.youtube.com/watch?v=lZ6hku1lbaQ");
        setPlaying(true);
      }}
    />
  );
}

export default PlayerComponent;
