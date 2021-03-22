using MusicTime.Bll.Dtos;

namespace MusicTime.Bll.IRepositories
{
    public interface IUserRepository
    {
        public void CreateUser(UserDto userDto);

        public bool IsUsernameTaken(string userName);

        public void Login(UserDto userDto);
    }
}
