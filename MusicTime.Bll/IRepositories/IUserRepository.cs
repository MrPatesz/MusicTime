using MusicTime.Bll.Dtos;
using System.Threading.Tasks;

namespace MusicTime.Bll.IRepositories
{
    public interface IUserRepository
    {
        public Task CreateUser(UserDto userDto);

        public bool IsUsernameTaken(string userName);

        public bool Login(UserDto userDto);
    }
}
