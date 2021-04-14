class DetailedSongDto {
  id: number;
  songTitle: string;
  url: string;
  artistName: string;
  albumTitle: string;

  constructor(
    id: number,
    songTitle: string,
    url: string,
    artistName: string,
    albumTitle: string
  ) {
    this.id = id;
    this.songTitle = songTitle;
    this.url = url;
    this.artistName = artistName;
    this.albumTitle = albumTitle;
  }
}

export default DetailedSongDto;
