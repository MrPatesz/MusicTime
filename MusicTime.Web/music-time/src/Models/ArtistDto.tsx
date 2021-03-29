class ArtistDto {
  id: number;
  name: string;
  description: string | null;
  pictureGuid: string | null;

  constructor(
    id: number,
    name: string,
    description: string | null,
    pictureGuid: string | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.pictureGuid = pictureGuid;
    
  }
}

export default ArtistDto;
