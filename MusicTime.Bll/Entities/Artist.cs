using System;
using System.Collections.Generic;

namespace MusicTime.Bll.Entities
{
    public class Artist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public Guid? PictureGuid { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; }
        public virtual List<Album> Albums { get; set; }
    }
}
