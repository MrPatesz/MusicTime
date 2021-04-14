class SongDto {
  id: number;
  title: string;
  url: string;

  constructor(id: number, title: string, url: string) {
    this.id = id;
    this.title = title;
    this.url = url;
  }
}

export default SongDto;
