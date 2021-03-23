using MusicTime.Bll.Dtos;
using MusicTime.Bll.IRepositories;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class UserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<bool> Register(UserDto userDto)
        {
            if (!userRepository.IsUsernameTaken(userDto.UserName))
            {
                await userRepository.CreateUser(userDto);
                return true;
            }
            return false;
        }

        public string Login(UserDto userDto)
        {
            if (userRepository.Login(userDto))
                return "logged in";
            else
                return null;
        }
    }
}