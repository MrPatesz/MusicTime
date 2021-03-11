class AlbumDto {
    id: number;
    title: string;
    genre: string;
    description: string;
    releaseYear: number;
    coverGuid: string;
  
    constructor(id: number, title: string, genre: string, description: string, releaseYear: number, coverGuid: string) {
      this.id = id;
      this.title = title;
      this.genre = genre;
      this.description = description;
      this.releaseYear = releaseYear;
      this.coverGuid = coverGuid;
    }
  }
  
  export default AlbumDto;
  