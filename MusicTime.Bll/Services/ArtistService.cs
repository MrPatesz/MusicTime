using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        public async Task<ArtistDto> AddArtist(int userId, ArtistDto artistDto)
        {
            if (!artistRepository.DoesArtistAlreadyExist(userId, artistDto.Name))
            {
                var artist = new Artist
                {
                    Name = artistDto.Name,
                    Description = artistDto.Description,
                    PictureGuid = artistDto.PictureGuid,
                    UserId = userId
                };

                return await artistRepository.AddArtist(artist);
            }
            return null;
        }

        public async Task<ArtistDto> EditArtist(int userId, ArtistDto artistDto)
        {
            if (artistRepository.DoesArtistAlreadyExist(userId, artistDto.Name))
            {
                var artist = new Artist
                {
                    Id = artistDto.Id,
                    Name = artistDto.Name,
                    Description = artistDto.Description,
                    PictureGuid = artistDto.PictureGuid,
                    UserId = userId
                };
                return await artistRepository.EditArtist(userId, artist);
            }
            return null;
        }

        public async Task<bool> DeleteArtist(int userId, int artistId)
        {
            // delete all albums and songs too !!!
            return await artistRepository.DeleteArtistById(userId, artistId);
        }
    }
}
