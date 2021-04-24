using System.Collections.Generic;

namespace MusicTime.Bll.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public virtual List<Artist> Artists { get; set; }
        public virtual List<Playlist> Playlists { get; set; }
    }
}
