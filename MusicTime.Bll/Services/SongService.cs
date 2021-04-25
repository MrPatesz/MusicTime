using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class SongService
    {
        private readonly ISongRepository songRepository;
        private readonly IPlaylistRepository playlistRepository;

        public SongService(ISongRepository songRepository, IPlaylistRepository playlistRepository)
        {
            this.songRepository = songRepository;
            this.playlistRepository = playlistRepository;
        }

        public List<SongDto> GetSongs(int userId)
        {
            return songRepository.GetSongs(userId);
        }

        public List<DetailedSongDto> GetDetailedSongs(int userId)
        {
            return songRepository.GetDetailedSongs(userId);
        }

        public async Task<bool> DeleteSongById(int userId, int songId)
        {
            var songs = songRepository.GetSongs(userId);
            var songToDelete = songs.Find(s => s.Id == songId);

            await playlistRepository.DeleteSongFromPlaylists(songToDelete.Id);

            return await songRepository.DeleteSongById(userId, songId);
        }

        public async Task<SongDto> AddSong(int userId, SongDto songDto, int albumId)
        {
            if (!songRepository.DoesSongAlreadyExist(userId, songDto, albumId))
            {
                var song = new Song
                {
                    Title = songDto.Title,
                    AlbumId = albumId,
                    Url = songDto.Url,
                };

                return await songRepository.AddSong(song);
            }
            return null;
        }
    }
}
