import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { clearQueue, removeAt } from "../../redux/queue";
import { setIndex } from "../../redux/queue";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface Props {
  show: boolean;
  shuffle: boolean;
  setShuffle: Dispatch<SetStateAction<boolean>>;
}

function QueueComponent({ show, shuffle, setShuffle }: Props) {
  const dispatch = useDispatch();
  const queue = useSelector((state: RootState) => state.queue.queue);
  const index = useSelector((state: RootState) => state.queue.index);

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
                className="d-flex flex-row w-100 queue-item"
                onClick={() => dispatch(setIndex(queue.indexOf(s)))}
              >
                <div className="align-self-center">{s.songTitle}</div>
                <div className="ml-auto align-self-center">{s.artistName}</div>
              </div>

              <Button
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
          className="my-1 mx-2"
          variant={shuffle ? "info" : "outline-info"}
          onClick={() => {
            setShuffle(!shuffle);
          }}
        >
          <FontAwesomeIcon icon="random" />
        </Button>
        <Button
          className="my-1"
          variant="outline-info"
          onClick={() => {
            /*save to playlist*/
          }}
        >
          <FontAwesomeIcon icon="folder-plus" />
        </Button>
        <Button
          className="ml-auto mr-2 my-1"
          variant="outline-warning"
          onClick={() => {
            dispatch(clearQueue());
          }}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </Button>
      </div>
    </div>
  );
}

export default QueueComponent;
