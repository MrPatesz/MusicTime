using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Dtos;
using MusicTime.Bll.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MusicTime.Api.Controllers
{
    [Route("api/artists")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly ArtistService artistService;

        public ArtistController(ArtistService artistService)
        {
            this.artistService = artistService;
        }

        [HttpGet]
        [Authorize]
        public List<ArtistDto> GetArtists()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return artistService.GetArtists(userId);
        }

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ArtistDto> GetArtistById(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var artist = artistService.GetArtistById(userId, id);
            if (artist == null)
                return NotFound();
            else
                return Ok(artist);
        }

        [HttpGet("{artistId}/albums")]
        [Authorize]
        public List<AlbumDto> GetAlbumsOfArtist(int artistId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return artistService.GetAlbumsOfArtist(userId, artistId);
        }

        [HttpGet("{artistId}/songs")]
        [Authorize]
        public List<SongDto> GetSongsOfArtist(int artistId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return artistService.GetSongsOfArtist(userId, artistId);
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ArtistDto>> AddArtist([FromBody] ArtistDto artistDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var artist = await artistService.AddArtist(userId, artistDto);
            if (artist == null)
                return BadRequest();
            else
                return Ok(artist);
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ArtistDto>> EditArtist([FromBody] ArtistDto artistDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var artist = await artistService.EditArtist(userId, artistDto);
            if (artist == null)
                return BadRequest();
            else
                return Ok(artist);
        }

        [HttpDelete("{artistId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteArtistById(int artistId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (await artistService.DeleteArtistById(userId, artistId))
                return Ok();
            else
                return BadRequest();
        }
    }
}
