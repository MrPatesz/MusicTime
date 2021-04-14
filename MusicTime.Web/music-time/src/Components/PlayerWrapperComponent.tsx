import ReactPlayer from "react-player/youtube";
import { useState } from "react";

interface Props {
  width: number;
  height: number;
}

function PlayerWrapperComponent({ width, height }: Props) {
  const [urlArray, setUrlArray] = useState<string[]>([
    "https://www.youtube.com/watch?v=1givs65YWBg",
    "https://www.youtube.com/watch?v=lZ6hku1lbaQ",
  ]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  return (
    <ReactPlayer
      url={urlArray[index]}
      controls={true}
      playing={playing}
      onEnded={() => {
        setIndex(index < urlArray.length - 1 ? index + 1 : 0);
        setPlaying(true);
      }}
      width={width}
      height={height}
    />
  );
}

export default PlayerWrapperComponent;
