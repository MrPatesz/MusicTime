using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Dtos;
using MusicTime.Bll.Services;
using System;
using System.Collections.Generic;
using System.Security.Claims;

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
    }
}
