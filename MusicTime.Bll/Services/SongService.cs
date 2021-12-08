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
            var songs = songRepository.GetSongs(userId);
            songs.Sort((s1, s2) => s1.Title.CompareTo(s2.Title));
            return songs;
        }

        public List<DetailedSongDto> GetDetailedSongs(int userId)
        {
            var songs = songRepository.GetDetailedSongs(userId);
            songs.Sort((s1, s2) => s1.SongTitle.CompareTo(s2.SongTitle));
            return songs;
        }

        public async Task<bool> DeleteSongById(int userId, int songId)
        {
            var songToDelete = songRepository.GetSong(songId);

            await playlistRepository.DeleteSongFromPlaylists(songToDelete.Id);

            var albumId = songRepository.GetAlbumIdOfSong(songToDelete.Id);

            await songRepository.SongRemovedFrom(albumId, songToDelete.AlbumIndex);

            return await songRepository.DeleteSongById(userId, songId);
        }

        public async Task<SongDto> AddSong(int userId, SongDto songDto, int albumId)
        {
            if (!songRepository.DoesSongAlreadyExist(userId, songDto, albumId))
            {
                var song = new Song
                {
                    Title = songDto.Title,
                    Url = songDto.Url,
                    AlbumId = albumId,
                    AlbumIndex = songDto.AlbumIndex
                };
                await songRepository.SongAddedTo(albumId, songDto.AlbumIndex);
                return await songRepository.AddSong(song);
            }
            return null;
        }

        public async Task<SongDto> EditSong(int userId, SongDto songDto, int albumId)
        {
            if (!songRepository.DoesSongAlreadyExist(userId, songDto, albumId))
            {
                var song = new Song
                {
                    Id = songDto.Id,
                    Title = songDto.Title,
                    Url = songDto.Url,
                    AlbumId = albumId,
                    AlbumIndex = songDto.AlbumIndex
                };
                var oldSong = songRepository.GetSong(songDto.Id);

                if(song.AlbumIndex != oldSong.AlbumIndex)
                {
                    await songRepository.SongMovedFromTo(albumId, oldSong.AlbumIndex, song.AlbumIndex);
                }
                return await songRepository.EditSong(song);
            }
            return null;
        }
    }
}
