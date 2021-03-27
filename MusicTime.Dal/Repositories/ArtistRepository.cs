using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using System.Collections.Generic;
using System.Linq;

namespace MusicTime.Dal.Repositories
{
    public class ArtistRepository : IArtistRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public ArtistRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<ArtistDto> GetArtists(int userId)
        {
            return dbContext.Artists.Where(a => a.UserId == userId).Select(ToDto).ToList();
        }

        public ArtistDto GetArtistById(int userId, int id)
        {
            var artist = dbContext.Artists.FirstOrDefault(a => a.Id == id && a.UserId == userId);
            if (artist == null)
                return null;
            else
                return ToDto(artist);
        }

        private ArtistDto ToDto(Artist value)
        {
            return new ArtistDto
            {
                Id = value.Id,
                Name = value.Name,
                Description = value.Description,
                PictureGuid = value.PictureGuid
            };
        }
    }
}
