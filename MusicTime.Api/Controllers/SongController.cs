using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Dtos;
using MusicTime.Bll.Services;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MusicTime.Api.Controllers
{
    [Route("api/songs")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly SongService songService;

        public SongController(SongService songService)
        {
            this.songService = songService;
        }

        [HttpGet]
        public List<SongDto> GetSongs()
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return songService.GetSongs(userId);
        }

        [HttpDelete("{songId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteSongById(int songId)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (await songService.DeleteSongById(userId, songId))
                return Ok();
            else
                return BadRequest();
        }
    }
}
