using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class PlaylistService
    {
        private readonly IPlaylistRepository playlistRepository;
        private readonly ISongRepository songRepository;

        public PlaylistService(IPlaylistRepository playlistRepository, ISongRepository songRepository)
        {
            this.playlistRepository = playlistRepository;
            this.songRepository = songRepository;
        }

        public List<PlaylistDto> GetPlaylists(int userId)
        {
            return playlistRepository.GetPlaylists(userId);
        }

        public PlaylistDto GetPlaylistById(int userId, int id)
        {
            return playlistRepository.GetPlaylistById(userId, id);
        }

        public List<DetailedSongDto> GetSongsOfPlaylist(int userId, int playlistId)
        {
            return songRepository.GetDetailedSongsOfPlaylist(userId, playlistId);
        }

        public async Task<PlaylistDto> AddPlaylist(int userId, PlaylistDto playlistDto)
        {
            // useré-e ez az artist??
            if (!playlistRepository.DoesPlaylistAlreadyExist(userId, playlistDto))
            {
                var playlist = new Playlist
                {
                    Title = playlistDto.Title,
                    Description = playlistDto.Description,
                    CoverGuid = playlistDto.CoverGuid,
                    UserId = userId
                };

                return await playlistRepository.AddPlaylist(playlist);
            }
            return null;
        }

        public async Task<PlaylistDto> EditPlaylist(int userId, PlaylistDto playlistDto)
        {
            if (!playlistRepository.DoesPlaylistAlreadyExist(userId, playlistDto))
            {
                var playlist = new Playlist
                {
                    Id = playlistDto.Id,
                    Title = playlistDto.Title,
                    Description = playlistDto.Description,
                    CoverGuid = playlistDto.CoverGuid,
                };
                return await playlistRepository.EditPlaylist(playlist);
            }
            return null;
        }

        public async Task<bool> DeletePlaylistById(int userId, int id)
        {
            return await playlistRepository.DeletePlaylistById(userId, id);
        }

        public async Task<bool> AddSongToPlaylist(int userId, int playlistId, SongDto songDto)
        {
            if (!playlistRepository.DoesPlaylistContainSong(playlistId, songDto))
            {
                var songToPlaylist = new SongToPlaylist
                {
                    SongId = songDto.Id,
                    PlaylistId = playlistId
                };
                return await playlistRepository.AddSongToPlaylist(songToPlaylist);
            }
            return false;
        }

        public async Task<bool> RemoveSongFromPlaylist(int userId, int playlistId, SongDto songDto)
        {
            if(playlistRepository.DoesPlaylistContainSong(playlistId, songDto))
            {
                var songToPlaylist = new SongToPlaylist
                {
                    SongId = songDto.Id,
                    PlaylistId = playlistId
                };
                return await playlistRepository.RemoveSongFromPlaylist(songToPlaylist);
            }
            return false;
        }
    }
}
