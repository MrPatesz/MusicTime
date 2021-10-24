using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using MusicTime.Bll.Entities;
using System.Linq;
using System.Threading.Tasks;
using MusicTime.Bll.Dtos;

namespace MusicTime.Dal.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public UserRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task AddUser(User user)
        {
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();
        }

        public bool IsUsernameTaken(string userName)
        {
            return dbContext.Users.Any(u => u.UserName == userName);
        }

        public User GetUserByUsername(string userName)
        {
            return dbContext.Users.FirstOrDefault(u => u.UserName == userName);
        }

        public async Task ChangePassword(string UserName, byte[] computedHash)
        {
            var user = dbContext.Users.FirstOrDefault(u => u.UserName == UserName);

            user.PasswordHash = computedHash;

            dbContext.Users.Update(user);

            await dbContext.SaveChangesAsync();
        }
    }
}
