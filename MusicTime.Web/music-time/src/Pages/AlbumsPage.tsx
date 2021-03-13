import { useEffect, useState } from "react";
import axios from "axios";
import AlbumDto from "../Models/AlbumDto";
import CardComponent from "../Components/CardComponent";

interface Props {
  setCurrentId: (id: number) => void;
}

function AlbumsPage({ setCurrentId }: Props) {
  const apiLink = "https://localhost:5001/api/albums/";

  const [albums, setAlbums] = useState<AlbumDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiLink);

      let albumsArray: AlbumDto[] = [];

      result.data.forEach((album: AlbumDto) => {
        albumsArray.push(
          new AlbumDto(
            album.id,
            album.title,
            album.genre,
            album.description,
            album.releaseYear,
            album.coverGuid
          )
        );
      });
      setAlbums(albumsArray);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      {albums.map((a) => (
        <CardComponent
          title={a.title}
          pictureGuid={a.coverGuid}
          deleteFunction={(id: number) => {}}
          linkTo="albums/"
          objectId={a.id}
          setCurrentId={setCurrentId}
        ></CardComponent>
      ))}
    </div>
  );
}

export default AlbumsPage;
