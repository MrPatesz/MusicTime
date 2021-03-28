using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicTime.Dal.Repositories
{
    public class AlbumRepository : IAlbumRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public AlbumRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<AlbumDto> GetAlbums(int userId)
        {
            return dbContext.Albums.Where(a => a.Artist.UserId == userId).Select(ToDto).ToList();
        }

        public AlbumDto GetAlbumById(int userId, int id)
        {
            var album = dbContext.Albums.FirstOrDefault(a => a.Id == id && a.Artist.UserId == userId);
            if (album == null)
                return null;
            else
                return ToDto(album);
        }

        public List<AlbumDto> GetAlbumsOfArtist(int userId, int artistId)
        {
            return dbContext.Albums.Where(a => a.ArtistId == artistId && a.Artist.UserId == userId).Select(ToDto).ToList();
        }

        public bool DoesAlbumAlreadyExist(int userId, AlbumDto albumDto, int artistId)
        {
            return dbContext.Albums.Any(a => a.Title == albumDto.Title && a.Artist.UserId == userId && a.ArtistId == artistId);
        }

        public async Task<AlbumDto> AddAlbum(Album album)
        {
            dbContext.Albums.Add(album);
            await dbContext.SaveChangesAsync();

            return ToDto(album);
        }

        private AlbumDto ToDto(Album value)
        {
            return new AlbumDto
            {
                Id = value.Id,
                Title = value.Title,
                Genre = value.Genre,
                Description = value.Description,
                ReleaseYear = value.ReleaseYear,
                CoverGuid = value.CoverGuid
            };
        }
    }
}
