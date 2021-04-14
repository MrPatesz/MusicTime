using System;

namespace MusicTime.Bll.Dtos
{
    public class PlaylistDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid? CoverGuid { get; set; }
    }
}
