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

        List<SongDto> GetSongsOfPlaylist(int userId, int playlistId);

        Task<bool> DeleteSongById(int userId, int songId);

        bool DoesSongAlreadyExist(int userId, SongDto song, int albumId);

        Task<SongDto> AddSong(Song song);

        List<DetailedSongDto> GetDetailedSongs(int userId);

        List<DetailedSongDto> GetDetailedSongsOfPlaylist(int userId, int playlistId);

        Task<SongDto> EditSong(Song song);

        Task<bool> SongAddedTo(int albumId, int albumIndex);

        Task<bool> SongMovedFromTo(int albumId, int from, int to);

        Task<bool> SongRemovedFrom(int albumId, int albumIndex);

        int GetAlbumIdOfSong(int songId);

        SongDto GetSong(int songId);
    }
}
