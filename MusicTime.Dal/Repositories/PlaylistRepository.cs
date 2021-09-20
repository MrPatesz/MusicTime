using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicTime.Dal.Repositories
{
    public class PlaylistRepository : IPlaylistRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public PlaylistRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<PlaylistDto> GetPlaylists(int userId)
        {
            return dbContext.Playlists.Where(p => p.UserId == userId).Select(ToDto).ToList();
        }

        public PlaylistDto GetPlaylistById(int userId, int id)
        {
            var playlist = dbContext.Playlists.FirstOrDefault(p => p.Id == id && p.UserId == userId);
            if (playlist == null)
                return null;
            else
                return ToDto(playlist);
        }

        public bool DoesPlaylistAlreadyExist(int userId, PlaylistDto playlistDto)
        {
            return dbContext.Playlists.Any(p => p.Title == playlistDto.Title && p.UserId == userId && p.Id != playlistDto.Id);
        }

        public async Task<PlaylistDto> AddPlaylist(Playlist playlist)
        {
            dbContext.Playlists.Add(playlist);
            await dbContext.SaveChangesAsync();

            return ToDto(playlist);
        }

        public async Task<bool> DeletePlaylistById(int userId, int id)
        {
            var toRemove = dbContext.Playlists.FirstOrDefault(p => p.Id == id && p.UserId == userId);

            if (toRemove != null)
            {
                dbContext.Playlists.Remove(toRemove);
                await dbContext.SaveChangesAsync();
                return true;
            }
            else return false;
        }

        public async Task<PlaylistDto> EditPlaylist(Playlist playlist)
        {
            var toEdit = dbContext.Playlists.FirstOrDefault(a => a.Id == playlist.Id);

            toEdit.Title = playlist.Title;
            toEdit.Description = playlist.Description;

            if (playlist.CoverGuid != null)
                toEdit.CoverGuid = playlist.CoverGuid;

            dbContext.Playlists.Update(toEdit);

            await dbContext.SaveChangesAsync();

            return ToDto(toEdit);
        }

        public async Task<bool> AddSongToPlaylist(SongToPlaylist songToPlaylist)
        {
            dbContext.SongToPlaylistRecords.Add(songToPlaylist);
            await dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RemoveSongFromPlaylist(SongToPlaylist songToPlaylist)
        {
            var toRemove = dbContext.SongToPlaylistRecords.FirstOrDefault(a => a.SongId == songToPlaylist.SongId && a.PlaylistId == songToPlaylist.PlaylistId);

            if(toRemove != null)
            {
                dbContext.SongToPlaylistRecords.Remove(toRemove);
                await dbContext.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }           
        }

        public async Task<bool> RemoveAllSongsFromPlaylist(int playlistId)
        {
            var songToPlaylists = dbContext.SongToPlaylistRecords.Where(stp => stp.PlaylistId == playlistId).ToList();

            songToPlaylists.ForEach(stp => dbContext.SongToPlaylistRecords.Remove(stp));

            await dbContext.SaveChangesAsync();

            return true;
        }

        public bool DoesPlaylistContainSong(int playlistId, SongDto songDto)
        {
            return dbContext.SongToPlaylistRecords.Any(stp => stp.SongId == songDto.Id && stp.PlaylistId == playlistId);
        }

        public async Task<bool> DeleteSongFromPlaylists(int songId)
        {
            var toRemoveList = dbContext.SongToPlaylistRecords.Where(p => p.SongId == songId).ToList();

            foreach(var stp in toRemoveList)
            {
                dbContext.SongToPlaylistRecords.Remove(stp);
            }
            await dbContext.SaveChangesAsync();

            return true;
        }

        private PlaylistDto ToDto(Playlist value)
        {
            return new PlaylistDto
            {
                Id = value.Id,
                Title = value.Title,
                Description = value.Description,
                CoverGuid = value.CoverGuid
            };
        }
    }
}
