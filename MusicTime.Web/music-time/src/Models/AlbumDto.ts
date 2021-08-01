class AlbumDto {
  id: number;
  title: string;
  genre: string | null;
  description: string | null;
  releaseYear: number | null;
  coverGuid: string | null;

  constructor(
    id: number,
    title: string,
    genre: string | null,
    description: string | null,
    releaseYear: number | null,
    coverGuid: string | null
  ) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.description = description;
    this.releaseYear = releaseYear;
    this.coverGuid = coverGuid;
  }
}

export default AlbumDto;
