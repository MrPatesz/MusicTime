namespace MusicTime.Bll.Dtos
{
    public class DetailedSongDto
    {
        public int SongId { get; set; }
        public string SongTitle { get; set; }
        public string Url { get; set; }
        public int ArtistId { get; set; }
        public string ArtistName { get; set; }
        public int AlbumId { get; set; }
        public string AlbumTitle { get; set; }
    }
}
