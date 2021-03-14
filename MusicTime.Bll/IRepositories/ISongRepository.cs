using MusicTime.Bll.Dtos;
using System.Collections.Generic;

namespace MusicTime.Bll.IRepositories
{
    public interface ISongRepository
    {
        List<SongDto> GetSongs();
        List<SongDto> GetSongsOfAlbum(int albumId);
    }
}
