import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface Props {
  title: string;
  pictureGuid: string | null;
}

function CardComponent({ title, pictureGuid }: Props) {
  if (pictureGuid === null) pictureGuid = "placeholder.png";

  return (
    <Card style={{ width: "13rem" }} className="bg-dark text-white">
      <Card.Img variant="top" src={pictureGuid} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text></Card.Text>
        <Button variant="primary">Details</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
