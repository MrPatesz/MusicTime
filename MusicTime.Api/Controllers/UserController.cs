using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Dtos;
using MusicTime.Bll.Services;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Register([FromBody] UserDto userDto)
        {
            if (await userService.Register(userDto))
                return Ok();
            else
                return BadRequest("Username already taken.");

        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult Login([FromBody] UserDto userDto)
        {
            var token = userService.Login(userDto);

            if (token == null)
                return Unauthorized("Wrong username or password.");
            else
                return Ok(token);
        }

        [HttpGet("login/valid")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<bool> IsLoginValid()
        {
            try
            {
                int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            }
            catch (Exception)
            {
                return Unauthorized(false);
            }

            return Ok(true);
        }

        [HttpPost("change/password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<bool>> ChangePassword([FromBody] PasswordChangeDto passwordChangeDto)
        {
            if (await userService.ChangePassword(passwordChangeDto))
                return Ok();
            else
                return Unauthorized("Wrong username or password.");
        }
    }
}
