class ArtistDto {
    id: number;
    name: string;
    description: string;
    pictureGuid: string;
  
    constructor(id: number, name: string, description: string, pictureGuid: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.pictureGuid = pictureGuid;
    }
  }
  
  export default ArtistDto;
  