using MusicTime.Bll.Dtos;
using System.Collections.Generic;

namespace MusicTime.Bll.IRepositories
{
    public interface ISongRepository
    {
        List<SongDto> GetSongs(int userId);
        List<SongDto> GetSongsOfAlbum(int userId, int albumId);
    }
}
