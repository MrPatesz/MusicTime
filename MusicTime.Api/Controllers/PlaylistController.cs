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
    [Route("api/playlists")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly PlaylistService playlistService;

        public PlaylistController(PlaylistService playlistService)
        {
            this.playlistService = playlistService;
        }

        [HttpGet]
        [Authorize]
        public List<PlaylistDto> GetPlaylists()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return playlistService.GetPlaylists(userId);
        }

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<PlaylistDto> GetPlaylistById(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var playlist = playlistService.GetPlaylistById(userId, id);
            if (playlist == null)
                return NotFound();
            else
                return Ok(playlist);
        }

        [HttpGet("{playlistId}/songs")]
        [Authorize]
        public List<DetailedSongDto> GetSongsOfPlaylist(int playlistId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return playlistService.GetSongsOfPlaylist(userId, playlistId);
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PlaylistDto>> AddPlaylist([FromBody] PlaylistDto playlistDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var playlist = await playlistService.AddPlaylist(userId, playlistDto);
            if (playlist == null)
                return BadRequest();
            else
                return Ok(playlist);
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PlaylistDto>> EditPlaylist([FromBody] PlaylistDto playlistDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var playlist = await playlistService.EditPlaylist(userId, playlistDto);
            if (playlist == null)
                return BadRequest();
            else
                return Ok(playlist);
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeletePlaylistById(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (await playlistService.DeletePlaylistById(userId, id))
                return Ok();
            else
                return BadRequest();
        }

        [HttpPost("{playlistId}/addSong")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddSongToPlaylist(int playlistId, [FromBody] SongDto songDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (await playlistService.AddSongToPlaylist(userId, playlistId, songDto))
                return Ok();
            else
                return BadRequest();
        }

        [HttpPost("{playlistId}/removeSong")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> RemoveSongFromPlaylist(int playlistId, [FromBody] SongDto songDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (await playlistService.RemoveSongFromPlaylist(userId, playlistId, songDto))
                return Ok();
            else
                return BadRequest();
        }
    }
}
