using MusicTime.Bll.Dtos;
using MusicTime.Bll.IRepositories;

namespace MusicTime.Bll.Services
{
    public class UserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public bool Register(UserDto userDto)
        {
            if (!userRepository.IsUsernameTaken(userDto.UserName))
            {
                userRepository.CreateUser(userDto);
                return true;
            }
            return false;
        }

        public void Login(UserDto userDto)
        {
            userRepository.Login(userDto);
        }
    }
}