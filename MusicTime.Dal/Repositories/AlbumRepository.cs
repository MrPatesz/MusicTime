using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using System.Collections.Generic;
using System.Linq;

namespace MusicTime.Dal.Repositories
{
    public class AlbumRepository : IAlbumRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public AlbumRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<AlbumDto> GetAlbums()
        {
            return dbContext.Albums.Select(ToDto).ToList();
        }

        public AlbumDto GetAlbumById(int id)
        {
            return ToDto(dbContext.Albums.FirstOrDefault(a => a.Id == id));
        }

        public List<AlbumDto> GetAlbumsOfArtist(int artistId)
        {
            return dbContext.Albums.Where(a => a.ArtistId == artistId).Select(ToDto).ToList();
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
