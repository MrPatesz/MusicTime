using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using MusicTime.Bll.Entities;
using MusicTime.Bll.Dtos;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MusicTime.Dal.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public UserRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task CreateUser(UserDto userDto)
        {
            var user = new User { UserName = userDto.UserName };

            using (var hmac = new HMACSHA512())
            {
                user.PasswordSalt = hmac.Key;
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));

                dbContext.Users.Add(user);
                await dbContext.SaveChangesAsync();
            }
        }

        public bool IsUsernameTaken(string userName)
        {
            return dbContext.Users.Any(u => u.UserName == userName);
        }

        public bool Login(UserDto userDto)
        {
            var dbUser = dbContext.Users.FirstOrDefault(u => u.UserName == userDto.UserName);

            if (dbUser == null)
                return false;

            using (var hmac = new HMACSHA512(dbUser.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
                if (dbUser.PasswordHash.SequenceEqual(computedHash))
                    return true; //jwt token
                else
                    return false;
            }
        }
    }
}
