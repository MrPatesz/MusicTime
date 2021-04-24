using System;
using System.Collections.Generic;

namespace MusicTime.Bll.Entities
{
    public class Playlist
    {
        public Playlist()
        {
            PlaylistToSongs = new HashSet<SongToPlaylist>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid? CoverGuid { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<SongToPlaylist> PlaylistToSongs { get; set; }
    }
}
