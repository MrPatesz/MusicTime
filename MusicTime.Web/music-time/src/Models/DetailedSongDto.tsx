class DetailedSongDto {
  id: number;
  songTitle: string;
  artistName: string;
  albumTitle: string;

  constructor(
    id: number,
    songTitle: string,
    artistName: string,
    albumTitle: string
  ) {
    this.id = id;
    this.songTitle = songTitle;
    this.artistName = artistName;
    this.albumTitle = albumTitle;
  }
}

export default DetailedSongDto;
