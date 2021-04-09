import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

interface Props {
  title: string;
}

function SongComponent({ title }: Props) {
  return (
    <div className="d-flex flex-row">
      <div>{title}</div>

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
