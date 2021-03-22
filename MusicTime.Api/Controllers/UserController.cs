using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Dtos;
using MusicTime.Bll.Services;

namespace MusicTime.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("register")]
        public StatusCodeResult Register([FromBody] UserDto userDto)
        {
            if (userService.Register(userDto))
                return Ok();
            else
                return BadRequest();

        }

        [HttpPost("login")]
        public void Login([FromBody] UserDto userDto)
        {
            userService.Login(userDto);
        }
    }
}
