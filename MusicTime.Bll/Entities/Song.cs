using System.Collections.Generic;

namespace MusicTime.Bll.Entities
{
    public class Song
    {
        public Song()
        {
            SongToPlaylists = new HashSet<SongToPlaylist>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public int AlbumId { get; set; }

        public virtual Album Album { get; set; }
        public virtual ICollection<SongToPlaylist> SongToPlaylists { get; set; }
    }
}
