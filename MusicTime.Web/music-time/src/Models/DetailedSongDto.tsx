class DetailedSongDto {
  songId: number;
  songTitle: string;
  url: string;
  artistId: number;
  artistName: string;
  albumId: number;
  albumTitle: string;

  constructor(
    songId: number,
    songTitle: string,
    url: string,
    artistId: number,
    artistName: string,
    albumId: number,
    albumTitle: string
  ) {
    this.songId = songId;
    this.songTitle = songTitle;
    this.url = url;
    this.artistId = artistId;
    this.artistName = artistName;
    this.albumTitle = albumTitle;
    this.albumId = albumId;
  }
}

export default DetailedSongDto;
