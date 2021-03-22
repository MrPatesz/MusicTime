using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using MusicTime.Bll.Entities;
using MusicTime.Bll.Dtos;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace MusicTime.Dal.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public UserRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void CreateUser(UserDto userDto)
        {
            using (var hmac = new HMACSHA512())
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
                
                foreach(byte b in hash) System.Console.WriteLine(b.ToString());

                dbContext.Users.Add(
                    new User {
                        UserName = userDto.UserName,
                        PasswordSalt = hmac.Key,
                        PasswordHash = hash,
                    }
                );
            }
        }

        public bool IsUsernameTaken(string userName)
        {
            if (dbContext.Users.FirstOrDefault(u => u.UserName == userName) != null)
                return true;

            return false;
        }

        public void Login(UserDto userDto)
        {
            var dbUser = dbContext.Users.FirstOrDefault(u => u.UserName == userDto.UserName);
            using (var hmac = new HMACSHA512(dbUser.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
                if (dbUser.PasswordHash.SequenceEqual(computedHash))
                    return; //jwt token
            }
        }
    }
}
