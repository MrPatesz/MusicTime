import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { clearQueue, removeAt } from "../../redux/queue";
import { setIndex } from "../../redux/queue";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface Props {
  show: boolean;
}

function QueueComponent({ show }: Props) {
  const dispatch = useDispatch();
  const queue = useSelector((state: RootState) => state.queue.queue);
  const index = useSelector((state: RootState) => state.queue.index);

  return (
    <div>
      {show ? (
        <div className="">
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
                    <div className="ml-auto align-self-center">
                      {s.artistName}
                    </div>
                  </div>

                  <Button
                    className="ml-3 py-0 px-1"
                    variant="outline-warning"
                    size="sm"
                    onClick={() => {
                      dispatch(removeAt(i));
                    }}
                  >
                    X
                  </Button>
                </div>
              ))}
            </ul>
          </div>
          <div
            className="bg-dark border border-info"
            style={{
              position: "absolute",
              left: "-299px",
              bottom: "0px",
              width: "300px",
            }}
          >
            <Button
              className="my-1 mx-2"
              variant="outline-warning"
              onClick={() => {
                dispatch(clearQueue());
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default QueueComponent;
