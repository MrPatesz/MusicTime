using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Dtos;
using MusicTime.Bll.Services;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace MusicTime.Api.Controllers
{
    [Route("api/albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly AlbumService albumService;

        public AlbumController(AlbumService albumService)
        {
            this.albumService = albumService;
        }

        [HttpGet]
        [Authorize]
        public List<AlbumDto> GetAlbums()
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return albumService.GetAlbums(userId);
        }

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<AlbumDto> GetAlbumById(int id)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var album = albumService.GetAlbumById(userId, id);
            if (album == null)
                return NotFound();
            else
                return Ok(album);
        }

        [HttpGet("{albumId}/songs")]
        [Authorize]
        public List<SongDto> GetSongsOfAlbum(int albumId)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return albumService.GetSongsOfAlbum(userId, albumId);
        }
    }
}
