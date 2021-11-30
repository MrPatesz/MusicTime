import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

interface Props {
  error: unknown;
  data: any;
  isFetching: boolean;
  ChildJSX: () => JSX.Element;
}

function QueryComponent({ error, data, isFetching, ChildJSX }: Props) {
  return (
    <div>
      {error ? (
        <Alert variant="danger">An error occurred while fetching data!</Alert>
      ) : data ? (
        <ChildJSX />
      ) : isFetching ? (
        <Spinner animation="grow" variant="info" />
      ) : (
        <div />
      )}
    </div>
  );
}

export default QueryComponent;
