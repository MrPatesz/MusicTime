import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AutosuggestComponent from "./AutosuggestComponent";
import { useState } from "react";

interface Props {
  playlistId: number;
}

function AddSongToPlaylistComponent({ playlistId }: Props) {
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [song, setSong] = useState<string>("");

  const data: string[] = ["test1","test2","test1","test2","test1","test2","test1","test2","test1","test2","test1","test2"];

  return (
    <Form className="d-flex flex-row ml-auto">
      <div className="mr-3">
        <AutosuggestComponent
          onSuggestionSelected={(value: string) => setArtist(value)}
          onSuggestionAreaCleared={() => setArtist("")}
          placeholder={"artist"}
          data={data}
        ></AutosuggestComponent>
      </div>
      <div className="mr-3">
        <AutosuggestComponent
          onSuggestionSelected={(value: string) => setAlbum(value)}
          onSuggestionAreaCleared={() => setAlbum("")}
          placeholder={"album"}
          data={data}
        ></AutosuggestComponent>
      </div>
      <div className="mr-3">
        <AutosuggestComponent
          onSuggestionSelected={(value: string) => setSong(value)}
          onSuggestionAreaCleared={() => setSong("")}
          placeholder={"song"}
          data={data}
        ></AutosuggestComponent>
      </div>

      <ButtonGroup style={{ height: "38px" }}>
        <Button variant="outline-info">Add</Button>
      </ButtonGroup>
    </Form>
  );
}

export default AddSongToPlaylistComponent;
