using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Services;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MusicTime.Api.Controllers
{
    [Route("api/pictures")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly PictureService pictureService;

        public PictureController(PictureService pictureService)
        {
            this.pictureService = pictureService;
        }

        public class FileUpload
        {
            public IFormFile File { get; set; }
        }

        [HttpPut("artist/{artistId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpdateArtistPicture([FromForm] FileUpload objFile, int artistId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            try
            {
                if (objFile.File.Length > 0)
                {
                    var fileName = await pictureService.UpdateArtistPicture(userId, artistId, objFile.File);
                    return Ok(fileName);
                }
                else
                {
                    return BadRequest("File not provided");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPut("album/{albumId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpdateAlbumCover([FromForm] FileUpload objFile, int albumId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            try
            {
                if (objFile.File.Length > 0)
                {
                    var fileName = await pictureService.UpdateAlbumCover(userId, albumId, objFile.File);
                    return Ok(fileName);
                }
                else
                {
                    return BadRequest("File not provided");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPut("playlist/{playlistId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> UpdatePlaylistCover([FromForm] FileUpload objFile, int playlistId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            try
            {
                if (objFile.File.Length > 0)
                {
                    var fileName = await pictureService.UpdatePlaylistCover(userId, playlistId, objFile.File);
                    return Ok(fileName);
                }
                else
                {
                    return BadRequest("File not provided");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
    }
}
