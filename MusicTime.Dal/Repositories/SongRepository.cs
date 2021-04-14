using MusicTime.Bll.Dtos;
using MusicTime.Dal.EfDbContext;
using MusicTime.Bll.Entities;
using System.Collections.Generic;
using System.Linq;
using MusicTime.Bll.IRepositories;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicTime.Dal.Repositories
{
    public class SongRepository : ISongRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public SongRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<SongDto> GetSongs(int userId)
        {
            return dbContext.Songs.Where(s => s.Album.Artist.UserId == userId).Select(ToDto).ToList();
        }

        public List<SongDto> GetSongsOfAlbum(int userId, int albumId)
        {
            return dbContext.Songs.Where(s => s.AlbumId == albumId && s.Album.Artist.UserId == userId).Select(ToDto).ToList();
        }

        public async Task<bool> DeleteSongById(int userId, int songId)
        {
            var toRemove = dbContext.Songs.FirstOrDefault(a => a.Id == songId && a.Album.Artist.UserId == userId);

            if (toRemove != null) 
            {
                dbContext.Songs.Remove(toRemove);
                await dbContext.SaveChangesAsync();
                return true;
            }
            else return false;
        }

        public bool DoesSongAlreadyExist(int userId, SongDto songDto, int albumId)
        {
            return dbContext.Songs.Any(a => a.Title == songDto.Title && a.AlbumId == albumId && a.Id != songDto.Id);
        }

        public async Task<SongDto> AddSong(Song song)
        {
            dbContext.Songs.Add(song);
            await dbContext.SaveChangesAsync();

            return ToDto(song);
        }

        public List<DetailedSongDto> GetDetailedSongs(int userId)
        {
            return dbContext.Songs
                .Include(s => s.Album)
                .Include(s => s.Album.Artist)
                .Where(s => s.Album.Artist.UserId == userId)
                .Select(ToDetailedDto).ToList();
        }

        private SongDto ToDto(Song value)
        {
            return new SongDto
            {
                Id = value.Id,
                Title = value.Title,
                Url = value.Url
            };
        }

        private DetailedSongDto ToDetailedDto(Song value)
        {
            return new DetailedSongDto
            {
                SongId = value.Id,
                SongTitle = value.Title,
                Url = value.Url,
                AlbumTitle = value.Album.Title,
                ArtistName = value.Album.Artist.Name,
            };
        }
    }
}
