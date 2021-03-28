using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class AlbumService
    {
        private readonly IAlbumRepository albumRepository;
        private readonly ISongRepository songRepository;

        public AlbumService(IAlbumRepository albumRepository, ISongRepository songRepository)
        {
            this.albumRepository = albumRepository;
            this.songRepository = songRepository;
        }

        public List<AlbumDto> GetAlbums(int userId)
        {
            return albumRepository.GetAlbums(userId);
        }

        public AlbumDto GetAlbumById(int userId, int id)
        {
            return albumRepository.GetAlbumById(userId, id);
        }

        public List<SongDto> GetSongsOfAlbum(int userId, int albumId)
        {
            return songRepository.GetSongsOfAlbum(userId, albumId);
        }

        public async Task<AlbumDto> AddAlbum(int userId, AlbumDto albumDto, int artistId)
        {
            if (!albumRepository.DoesAlbumAlreadyExist(userId, albumDto, artistId))
            {
                var album = new Album
                {
                    Title = albumDto.Title,
                    Description = albumDto.Description,
                    CoverGuid = albumDto.CoverGuid,
                    ArtistId = artistId,
                    ReleaseYear = albumDto.ReleaseYear,
                    Genre = albumDto.Genre
                };

                return await albumRepository.AddAlbum(album);
            }
            return null;
        }
    }
}
