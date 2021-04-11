import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function PlaylistAddSongComponent() {
  return (
    //>
    <Form className="d-flex flex-row ml-auto">
      <Form.Group>
        <Form.Control placeholder="artist"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control placeholder="album"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control placeholder="song"></Form.Control>
      </Form.Group>
      <ButtonGroup size="sm">
        <Button variant="outline-info" style={{ maxHeight: "2rem" }}>
          Add
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default PlaylistAddSongComponent;
