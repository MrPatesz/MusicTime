using MusicTime.Bll.Dtos;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;

namespace MusicTime.Bll.Services
{
    public class ArtistService
    {
        private readonly IArtistRepository repository;

        public ArtistService(IArtistRepository repository)
        {
            this.repository = repository;
        }

        public List<ArtistDto> GetArtists()
        {
            return repository.GetArtists();
        }

        public ArtistDto GetArtistById(int id)
        {
            return repository.GetArtistById(id);
        }
    }
}
