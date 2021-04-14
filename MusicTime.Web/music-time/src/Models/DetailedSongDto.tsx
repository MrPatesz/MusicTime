class DetailedSongDto {
  songId: number;
  songTitle: string;
  url: string;
  artistName: string;
  albumTitle: string;

  constructor(
    songId: number,
    songTitle: string,
    url: string,
    artistName: string,
    albumTitle: string
  ) {
    this.songId = songId;
    this.songTitle = songTitle;
    this.url = url;
    this.artistName = artistName;
    this.albumTitle = albumTitle;
  }
}

export default DetailedSongDto;
