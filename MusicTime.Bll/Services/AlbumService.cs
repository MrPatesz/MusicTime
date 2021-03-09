using MusicTime.Bll.Dtos;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;

namespace MusicTime.Bll.Services
{
    public class AlbumService
    {
        private readonly IAlbumRepository repository;

        public AlbumService(IAlbumRepository repository)
        {
            this.repository = repository;
        }

        public List<AlbumDto> GetAlbums()
        {
            return repository.GetAlbums();
        }
    }
}
