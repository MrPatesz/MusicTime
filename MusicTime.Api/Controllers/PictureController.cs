using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicTime.Bll.Services;
using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MusicTime.Api.Controllers
{
    [Route("api/pictures")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IWebHostEnvironment environment;

        private readonly ArtistService artistService;
        private readonly AlbumService albumService;
        private readonly PlaylistService playlistService;

        public PictureController(IWebHostEnvironment environment, ArtistService artistService, AlbumService albumService, PlaylistService playlistService)
        {
            this.environment = environment;
            this.artistService = artistService;
            this.albumService = albumService;
            this.playlistService = playlistService;
        }

        public class FileUpload
        {
            public IFormFile File { get; set; }
        }

        [HttpPut("artist/{artistId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> EditArtistProfilePicture([FromForm] FileUpload objFile, int artistId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            try
            {
                if (objFile.File.Length > 0)
                {
                    var dir = environment.WebRootPath + "\\Pictures\\";

                    if (!Directory.Exists(dir))
                    {
                        Directory.CreateDirectory(dir);
                    }

                    Guid pictureGuid = Guid.NewGuid();
                    string fileName = $"{pictureGuid}.png";
                    // .png helyett: Path.GetExtension(objFile.File.FileName)
                    // de akkor Quid helyett stringet tárolni

                    using (FileStream fileStream = System.IO.File.Create(dir + fileName))
                    {
                        await objFile.File.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                    }

                    var artist = artistService.GetArtistById(userId, artistId);

                    if(artist.PictureGuid != null)
                    {
                        var toDelete = $"{dir}{artist.PictureGuid}.png";
                        if (System.IO.File.Exists(toDelete))
                            System.IO.File.Delete(toDelete);
                    }

                    artist.PictureGuid = pictureGuid;
                    await artistService.EditArtist(userId, artist);

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
