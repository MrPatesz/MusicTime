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

        public List<AlbumDto> GetAlbums()
        {
            return albumRepository.GetAlbums();
        }

        public AlbumDto GetAlbumById(int id)
        {
            return albumRepository.GetAlbumById(id);
        }

        public List<SongDto> GetSongsOfAlbum(int albumId)
        {
            return songRepository.GetSongsOfAlbum(albumId);
        }
    }
}
