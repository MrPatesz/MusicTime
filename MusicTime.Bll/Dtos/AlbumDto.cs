using System;

namespace MusicTime.Bll.Dtos
{
    public class AlbumDto
    {
        public int Id { get; set; }
        public string? ArtistName { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Description { get; set; }
        public int? ReleaseYear { get; set; }
        public Guid? CoverGuid { get; set; }
    }
}
