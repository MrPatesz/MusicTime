class PlaylistDto {
  id: number;
  title: string;
  description: string | null;
  coverGuid: string | null;

  constructor(
    id: number,
    title: string,
    description: string | null,
    coverGuid: string | null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.coverGuid = coverGuid;
  }
}

export default PlaylistDto;
