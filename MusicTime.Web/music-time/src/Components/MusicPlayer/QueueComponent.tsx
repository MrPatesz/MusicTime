import Button from "react-bootstrap/Button";
import DetailedSongDto from "../../Models/DetailedSongDto";

interface Props {
  queue: DetailedSongDto[];
  setQueue: React.Dispatch<React.SetStateAction<DetailedSongDto[]>>;
  show: boolean;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

function QueueComponent({ queue, setQueue, show, index, setIndex }: Props) {
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
              {queue.map((s) => (
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
                    onClick={() => setIndex(queue.indexOf(s))}
                  >
                    <div className="align-self-center">{s.songTitle}</div>
                    <div className="ml-auto align-self-center">{s.artistName}</div>
                  </div>

                  <Button
                    className="ml-3 py-0 px-1"
                    variant="outline-warning"
                    size="sm"
                    onClick={() => {
                      let removeIndex = -1;
                      setQueue(
                        queue.filter((s1, i) => {
                          if (s1.songId === s.songId) removeIndex = i;
                          return s1.songId !== s.songId;
                        })
                      );
                      setIndex(
                        removeIndex < index
                          ? index - 1
                          : index === queue.length - 1
                          ? 0
                          : index
                      );
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
                setQueue([]);
                setIndex(0);
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
