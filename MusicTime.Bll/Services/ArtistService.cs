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

        public List<ArtistDto> GetArtists(int userId)
        {
            return artistRepository.GetArtists(userId);
        }

        public ArtistDto GetArtistById(int userId, int id)
        {
            return artistRepository.GetArtistById(userId, id);
        }

        public List<AlbumDto> GetAlbumsOfArtist(int userId, int artistId)
        {
            return albumRepository.GetAlbumsOfArtist(userId, artistId);
        }
    }
}
