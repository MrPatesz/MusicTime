using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.IRepositories
{
    public interface ISongRepository
    {
        List<SongDto> GetSongs(int userId);

        List<SongDto> GetSongsOfAlbum(int userId, int albumId);

        Task<bool> DeleteSongById(int userId, int songId);

        bool DoesSongAlreadyExist(int userId, SongDto song, int albumId);

        Task<SongDto> AddSong(Song song);

        List<DetailedSongDto> GetDetailedSongs(int userId);
    }
}
