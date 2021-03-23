using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Dtos;
using MusicTime.Bll.Services;
using System.Collections.Generic;

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
        public List<ArtistDto> GetArtists()
        {
            return artistService.GetArtists();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ArtistDto> GetArtistById(int id)
        {
            var artist = artistService.GetArtistById(id);
            if (artist == null)
                return NotFound();
            else
                return Ok(artist);
        }

        [HttpGet("{artistId}/albums")]
        public List<AlbumDto> GetAlbumsOfArtist(int artistId)
        {
            return artistService.GetAlbumsOfArtist(artistId);
        }
    }
}
