import PlayerWrapperComponent from "./PlayerWrapperComponent";

function MusicPlayerComponent() {
  return (
    <div
      className="d-flex flex-row"
      style={{ position: "absolute", bottom: "10px", right: "10px" }}
    >
      <PlayerWrapperComponent width={320} height={180}></PlayerWrapperComponent>
    </div>
  );
}

export default MusicPlayerComponent;
