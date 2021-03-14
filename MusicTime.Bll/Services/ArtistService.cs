using MusicTime.Bll.Dtos;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;

namespace MusicTime.Bll.Services
{
    public class ArtistService
    {
        private readonly IArtistRepository artistRepository;
        private readonly IAlbumRepository albumRepository;

        public ArtistService(IArtistRepository artistRepository, IAlbumRepository albumRepository)
        {
            this.artistRepository = artistRepository;
            this.albumRepository = albumRepository;
        }

        public List<ArtistDto> GetArtists()
        {
            return artistRepository.GetArtists();
        }

        public ArtistDto GetArtistById(int id)
        {
            return artistRepository.GetArtistById(id);
        }

        public List<AlbumDto> GetAlbumsOfArtist(int artistId)
        {
            return albumRepository.GetAlbumsOfArtist(artistId);
        }
    }
}
