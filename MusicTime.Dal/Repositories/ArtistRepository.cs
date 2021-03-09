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

        public List<ArtistDto> GetArtists()
        {
            return dbContext.Artists.Select(ToDto).ToList();
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
