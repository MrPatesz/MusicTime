using MusicTime.Bll.Dtos;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;

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
    }
}
