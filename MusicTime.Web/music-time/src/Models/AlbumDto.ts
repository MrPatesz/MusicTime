class AlbumDto {
  id: number;
  artistName: string;
  title: string;
  genre: string | null;
  description: string | null;
  releaseYear: number | null;
  coverGuid: string | null;

  constructor(
    id: number,
    artistName: string,
    title: string,
    genre: string | null,
    description: string | null,
    releaseYear: number | null,
    coverGuid: string | null
  ) {
    this.id = id;
    this.artistName = artistName;
    this.title = title;
    this.genre = genre;
    this.description = description;
    this.releaseYear = releaseYear;
    this.coverGuid = coverGuid;
  }
}

export default AlbumDto;
