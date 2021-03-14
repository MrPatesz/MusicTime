using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Dtos;
using MusicTime.Bll.Services;
using System.Collections.Generic;

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
        public List<AlbumDto> GetAlbums()
        {
            return albumService.GetAlbums();
        }

        [HttpGet("{id}")]
        public AlbumDto GetAlbumById(int id)
        {
            return albumService.GetAlbumById(id);
        }

        [HttpGet("{albumId}/songs")]
        public List<SongDto> GetSongsOfAlbum(int albumId)
        {
            return albumService.GetSongsOfAlbum(albumId);
        }
    }
}
