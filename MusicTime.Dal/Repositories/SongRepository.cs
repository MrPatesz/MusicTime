using MusicTime.Bll.Dtos;
using MusicTime.Dal.EfDbContext;
using MusicTime.Bll.Entities;
using System.Collections.Generic;
using System.Linq;
using MusicTime.Bll.IRepositories;
using System.Threading.Tasks;

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

        private SongDto ToDto(Song value)
        {
            return new SongDto
            {
                Id = value.Id,
                Title = value.Title
            };
        }
    }
}
