import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface Props {
  title: string;
  artist: string | null;
  album: string | null;
}

function SongComponent({ title, artist, album }: Props) {
  return (
    <div className="d-flex flex-row mb-1">
      {artist === null ? (
        <h5>{title}</h5>
      ) : (
        <div className="d-flex flex-row">
          <h4 className="mr-5">{title}</h4>
          <div className="mr-5">{" by "}</div>
          <h5 className="mr-5">{artist}</h5>
          <div className="mr-5">{" from "}</div>
          <h5 className="mr-5">{album}</h5>
        </div>
      )}

      <ButtonGroup className="ml-auto">
        <Button variant="outline-info"> Add </Button>
      </ButtonGroup>
      <ButtonGroup className="ml-2">
        <Button variant="outline-danger"> Delete </Button>
      </ButtonGroup>
    </div>
  );
}

export default SongComponent;
