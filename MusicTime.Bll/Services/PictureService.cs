using Microsoft.AspNetCore.Http;
using MusicTime.Bll.IRepositories;
using System;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class PictureService
    {
        private readonly IPictureRepository pictureRepository;
        private readonly ArtistService artistService;
        private readonly AlbumService albumService;
        private readonly PlaylistService playlistService;

        public PictureService(IPictureRepository pictureRepository, ArtistService artistService, AlbumService albumService, PlaylistService playlistService)
        {
            this.pictureRepository = pictureRepository;
            this.artistService = artistService;
            this.albumService = albumService;
            this.playlistService = playlistService;
        }

        public async Task<string> UpdateArtistPicture(int userId, int artistId, IFormFile picture)
        {
            Guid pictureGuid = Guid.NewGuid();
            var fileName = await pictureRepository.SavePicture(picture, pictureGuid);

            var artist = artistService.GetArtistById(userId, artistId);

            if (artist.PictureGuid != null)
            {
                pictureRepository.DeletePicture(artist.PictureGuid.ToString());
            }

            artist.PictureGuid = pictureGuid;
            await artistService.EditArtist(userId, artist);

            return fileName;
        }

        public async Task<string> UpdateAlbumCover(int userId, int albumId, IFormFile picture)
        {
            Guid pictureGuid = Guid.NewGuid();
            var fileName = await pictureRepository.SavePicture(picture, pictureGuid);

            var album = albumService.GetAlbumById(userId, albumId);

            if (album.CoverGuid != null)
            {
                pictureRepository.DeletePicture(album.CoverGuid.ToString());
            }

            album.CoverGuid = pictureGuid;
            await albumService.EditAlbum(userId, album);

            return fileName;
        }

        public async Task<string> UpdatePlaylistCover(int userId, int playlistId, IFormFile picture)
        {
            Guid pictureGuid = Guid.NewGuid();
            var fileName = await pictureRepository.SavePicture(picture, pictureGuid);

            var playlist = playlistService.GetPlaylistById(userId, playlistId);

            if (playlist.CoverGuid != null)
            {
                pictureRepository.DeletePicture(playlist.CoverGuid.ToString());
            }

            playlist.CoverGuid = pictureGuid;
            await playlistService.EditPlaylist(userId, playlist);

            return fileName;
        }
    }
}
