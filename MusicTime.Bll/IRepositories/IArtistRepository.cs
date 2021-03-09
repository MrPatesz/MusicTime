using MusicTime.Bll.Dtos;
using System.Collections.Generic;

namespace MusicTime.Bll.IRepositories
{ 
    public interface IArtistRepository
    {
        List<ArtistDto> GetArtists();
    }
}
