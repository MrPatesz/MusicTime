import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface Props {
  title: string;
  pictureGuid: string | null;
}

function CardComponent({ title, pictureGuid }: Props) {

  if(pictureGuid === null)
    pictureGuid = "placeholder.png";

  return (
    <Card style={{ width: "18rem" }} className="bg-dark text-white">
      <Card.Img variant="top" src={pictureGuid} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
