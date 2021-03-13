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
        public ArtistDto GetArtistById(int id)
        {
            return artistService.GetArtistById(id);
        }
    }
}
