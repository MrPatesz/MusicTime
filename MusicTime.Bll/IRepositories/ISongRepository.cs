using MusicTime.Bll.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.IRepositories
{
    public interface ISongRepository
    {
        List<SongDto> GetSongs(int userId);

        List<SongDto> GetSongsOfAlbum(int userId, int albumId);

        Task<bool> DeleteSongById(int userId, int songId);
    }
}
