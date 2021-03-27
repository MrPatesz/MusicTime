using MusicTime.Bll.Dtos;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;

namespace MusicTime.Bll.Services
{
    public class SongService
    {
        private readonly ISongRepository repository;

        public SongService(ISongRepository repository)
        {
            this.repository = repository;
        }

        public List<SongDto> GetSongs(int userId)
        {
            return repository.GetSongs(userId);
        }
    }
}
