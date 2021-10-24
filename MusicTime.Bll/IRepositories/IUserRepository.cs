using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using System.Threading.Tasks;

namespace MusicTime.Bll.IRepositories
{
    public interface IUserRepository
    {
        public bool IsUsernameTaken(string userName);

        public Task AddUser(User user);

        public User GetUserByUsername(string userName);

        public Task ChangePassword(string UserName, byte[] computedHash);
    }
}
