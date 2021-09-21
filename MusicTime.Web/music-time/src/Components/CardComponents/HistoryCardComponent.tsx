import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  picturePath: string;
  relativeLink: string;
  playFunction: () => void;
}

function HistoryCardComponent({
  title,
  picturePath,
  relativeLink,
  playFunction,
}: Props) {
  return (
    <div>
      <Card
        style={{ minWidth: "11rem", maxWidth: "15rem" }}
        className="bg-dark text-white mb-3"
      >
        <Card.Img
          variant="top"
          src={picturePath}
          style={{ minHeight: "11rem", maxHeight: "15rem" }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <ButtonToolbar>
            <ButtonGroup className="mr-auto" size="sm">
              <Link
                to={relativeLink}
                className="btn btn-outline-info"
                title="Details"
              >
                <FontAwesomeIcon icon="file-alt" size="lg" />
              </Link>
            </ButtonGroup>
            <ButtonGroup size="sm">
              <Button
                onClick={playFunction}
                variant="outline-info"
                title="Play"
              >
                <FontAwesomeIcon icon="play" size="lg" />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HistoryCardComponent;
