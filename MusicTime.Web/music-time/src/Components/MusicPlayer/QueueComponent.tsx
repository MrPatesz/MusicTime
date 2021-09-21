import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { clearQueue, removeAt } from "../../redux/player";
import { setIndex } from "../../redux/player";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import AddQueueToPlaylistComponent from "../MusicPlayer/AddQueueToPlaylistComponent";
import { ButtonGroup } from "react-bootstrap";

interface Props {
  show: boolean;
  shuffle: boolean;
  setShuffle: Dispatch<SetStateAction<boolean>>;
  repeat: boolean;
  setRepeat: Dispatch<SetStateAction<boolean>>;
}

function QueueComponent({
  show,
  shuffle,
  setShuffle,
  repeat,
  setRepeat,
}: Props) {
  const dispatch = useDispatch();
  const queue = useSelector((state: RootState) => state.queue.queue);
  const index = useSelector((state: RootState) => state.queue.index);

  const [showAdd, setShowAdd] = useState<boolean>(false);

  if (!show) return <div></div>;

  return (
    <div>
      <div
        className="overflow-auto bg-dark px-2 py-1 border border-info"
        style={{
          height: "calc(100% - 47px)",
          width: "300px",
          position: "absolute",
          left: "-299px",
          top: "0px",
        }}
      >
        <ul className="no-bullets">
          {queue.map((s, i) => (
            <div
              key={s.songId}
              className={
                s.songId === queue[index].songId
                  ? "d-flex flex-row mb-1 text-info"
                  : "d-flex flex-row mb-1"
              }
            >
              <div
                title="Jump to song"
                className="d-flex flex-row w-100 queue-item"
                onClick={() => {
                  if (repeat) setRepeat(false);
                  dispatch(setIndex(queue.indexOf(s)));
                }}
              >
                <div className="align-self-center">{s.songTitle}</div>
                <div className="ml-auto align-self-center">{s.artistName}</div>
              </div>

              <Button
                title="Remove song from Queue"
                className="ml-3 py-0 px-1"
                variant="outline-warning"
                size="sm"
                onClick={() => {
                  dispatch(removeAt(i));
                }}
              >
                <FontAwesomeIcon icon="trash-alt" />
              </Button>
            </div>
          ))}
        </ul>
      </div>
      <div
        className="bg-dark border border-info d-flex"
        style={{
          position: "absolute",
          left: "-299px",
          bottom: "0px",
          width: "300px",
        }}
      >
        <Button
          title="Save Queue to playlist"
          className="my-1 mx-2"
          variant="outline-info"
          onClick={() => {
            if (queue.length > 0) setShowAdd(true);
          }}
        >
          <FontAwesomeIcon icon="folder-plus" />
        </Button>

        <ButtonGroup className="my-1 mr-2">
          <Button
            title={shuffle ? "Turn off shuffle" : "Turn on shuffle"}
            className="mr-1"
            variant={shuffle ? "info" : "outline-info"}
            onClick={() => {
              setShuffle(!shuffle);
            }}
          >
            <FontAwesomeIcon icon="random" />
          </Button>
          <Button
            title={repeat ? "Turn off repeat" : "Turn on repeat"}
            variant={repeat ? "info" : "outline-info"}
            onClick={() => setRepeat(!repeat)}
          >
            <FontAwesomeIcon icon="sync" />
          </Button>
        </ButtonGroup>

        <Button
          title="Clear Queue"
          className="ml-auto mr-2 my-1"
          variant="outline-warning"
          onClick={() => {
            dispatch(clearQueue());
          }}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </Button>
      </div>
      <AddQueueToPlaylistComponent
        showAdd={showAdd}
        setShowAdd={setShowAdd}
      ></AddQueueToPlaylistComponent>
    </div>
  );
}

export default QueueComponent;
