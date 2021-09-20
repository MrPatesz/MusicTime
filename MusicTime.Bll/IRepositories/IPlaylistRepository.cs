using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.IRepositories
{
    public interface IPlaylistRepository
    {
        List<PlaylistDto> GetPlaylists(int userId);

        PlaylistDto GetPlaylistById(int userId, int id);

        Task<PlaylistDto> AddPlaylist(Playlist playlist);

        bool DoesPlaylistAlreadyExist(int userId, PlaylistDto playlistDto);

        Task<bool> DeletePlaylistById(int userId, int playlistId);

        Task<PlaylistDto> EditPlaylist(Playlist playlist);

        Task<bool> AddSongToPlaylist(SongToPlaylist songToPlaylist);

        Task<bool> RemoveSongFromPlaylist(SongToPlaylist songToPlaylist);

        Task<bool> RemoveAllSongsFromPlaylist(int playlistId);

        bool DoesPlaylistContainSong(int playlistId, SongDto songDto);

        Task<bool> DeleteSongFromPlaylists(int songId);
    }
}
