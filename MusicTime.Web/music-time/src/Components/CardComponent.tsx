import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  pictureGuid: string | null;
  deleteFunction: (id: number) => void;
  apiLink: string;
  objectId: number;
}

function CardComponent({
  title,
  pictureGuid,
  deleteFunction,
  apiLink,
  objectId,
}: Props) {
  if (pictureGuid === null) pictureGuid = "placeholder.png";

  return (
    <Card
      style={{ minWidth: "11rem", maxWidth: "15rem" }}
      className="bg-dark text-white"
    >
      <Card.Img variant="top" src={pictureGuid} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ButtonToolbar>
          <ButtonGroup className="mr-auto" size="sm">
            <Link
              to={apiLink + "/" + objectId}
              className="btn btn-outline-info"
            >
              Details
            </Link>
          </ButtonGroup>
          <ButtonGroup size="sm">
            <Button
              onClick={() => {
                deleteFunction(objectId);
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
