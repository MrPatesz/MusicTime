import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { clearQueue, removeAt, moveFromTo } from "../../redux/player";
import { setIndex, shuffleQueue } from "../../redux/player";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import AddQueueToPlaylistComponent from "../MusicPlayer/AddQueueToPlaylistComponent";
import { ButtonGroup } from "react-bootstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Props {
  show: boolean;
  repeat: boolean;
  setRepeat: Dispatch<SetStateAction<boolean>>;
}

function QueueComponent({
  show,
  repeat,
  setRepeat,
}: Props) {
  const dispatch = useDispatch();
  const queue = useSelector((state: RootState) => state.player.queue);
  const index = useSelector((state: RootState) => state.player.index);

  const [showAdd, setShowAdd] = useState<boolean>(false);

  const handleOnDragEnd = (result: DropResult) => {
    if (
      result.destination &&
      result.destination.index !== result.source.index
    ) {
      dispatch(
        moveFromTo({ from: result.source.index, to: result.destination.index })
      );
    }
  };

  const width = 400;

  if (!show) return <div></div>;

  return (
    <div>
      <div
        className="overflow-auto bg-dark px-2 py-1 border border-info"
        style={{
          height: "calc(100% - 47px)",
          width: `${width}px`,
          position: "absolute",
          left: `-${width - 1}px`,
          top: "0px",
        }}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="queue">
            {(provided) => (
              <ul
                className="no-bullets"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {queue.map((s, i) => (
                  <Draggable
                    key={s.songId}
                    draggableId={s.songId.toString()}
                    index={i}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
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
                            dispatch(setIndex(i));
                          }}
                        >
                          <div className="align-self-center">{s.songTitle}</div>
                          <div className="ml-auto align-self-center">
                            {s.artistName}
                          </div>
                        </div>

                        <Button
                          title="Remove song from Queue"
                          className="ml-2 py-0 px-1"
                          variant="outline-warning"
                          size="sm"
                          onClick={() => {
                            dispatch(removeAt(i));
                          }}
                        >
                          <FontAwesomeIcon icon="trash-alt" />
                        </Button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div
        className="bg-dark border border-info d-flex"
        style={{
          position: "absolute",
          left: `-${width - 1}px`,
          bottom: "0px",
          width: `${width}px`,
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
            title="Shuffle Queue"
            className="mr-1"
            variant="outline-info"
            onClick={() => {
              dispatch(shuffleQueue());
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
