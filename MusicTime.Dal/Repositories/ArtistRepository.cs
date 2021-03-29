using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public bool DoesArtistAlreadyExist(int userId, string artistName)
        {
            return dbContext.Artists.Any(a => a.Name == artistName && a.UserId == userId);
        }

        public async Task<ArtistDto> AddArtist(Artist artist)
        {
            dbContext.Artists.Add(artist);
            await dbContext.SaveChangesAsync();

            return ToDto(artist);
        }

        public async Task<bool> DeleteArtistById(int userId, int artistId)
        {
            var toRemove = dbContext.Artists.FirstOrDefault(a => a.Id == artistId && a.UserId == userId);

            if(toRemove != null)
            {
                dbContext.Artists.Remove(toRemove);
                await dbContext.SaveChangesAsync();
                return true;
            }
            else return false;
        }

        public async Task<ArtistDto> EditArtist(int userId, Artist artist)
        {
            var toEdit = dbContext.Artists.FirstOrDefault(a => a.Id == artist.Id && a.UserId == userId);

            toEdit.Name = artist.Name;
            toEdit.Description = artist.Description;
            toEdit.PictureGuid = artist.PictureGuid;

            dbContext.Artists.Update(toEdit);

            await dbContext.SaveChangesAsync();

            return ToDto(toEdit);
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
