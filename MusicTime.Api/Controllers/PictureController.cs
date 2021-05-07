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
        public async Task<ActionResult<string>> EditArtistPicture([FromForm] FileUpload objFile, int artistId)
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

        [HttpPut("album/{albumId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> EditAlbumCover([FromForm] FileUpload objFile, int albumId)
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

                    var album = albumService.GetAlbumById(userId, albumId);

                    if (album.CoverGuid != null)
                    {
                        var toDelete = $"{dir}{album.CoverGuid}.png";
                        if (System.IO.File.Exists(toDelete))
                            System.IO.File.Delete(toDelete);
                    }

                    album.CoverGuid = pictureGuid;
                    await albumService.EditAlbum(userId, album);

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
        public async Task<ActionResult<string>> EditPlaylistCover([FromForm] FileUpload objFile, int playlistId)
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

                    var playlist = playlistService.GetPlaylistById(userId, playlistId);

                    if (playlist.CoverGuid != null)
                    {
                        var toDelete = $"{dir}{playlist.CoverGuid}.png";
                        if (System.IO.File.Exists(toDelete))
                            System.IO.File.Delete(toDelete);
                    }

                    playlist.CoverGuid = pictureGuid;
                    await playlistService.EditPlaylist(userId, playlist);

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
