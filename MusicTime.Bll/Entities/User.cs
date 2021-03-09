using System.Collections.Generic;

namespace MusicTime.Bll.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }

        public virtual List<Artist> Artists { get; set; }
    }
}
