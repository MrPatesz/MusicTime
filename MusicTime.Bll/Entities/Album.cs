using System;
using System.Collections.Generic;

namespace MusicTime.Bll.Entities
{
    public class Album
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public int? ReleaseYear { get; set; }
        public Guid? CoverGuid { get; set; }
        public int ArtistId { get; set; }

        public virtual Artist Artist { get; set; }
        public virtual List<Song> Songs { get; set; }
    }
}
