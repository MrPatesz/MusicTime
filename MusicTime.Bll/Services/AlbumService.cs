using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class AlbumService
    {
        private readonly IAlbumRepository albumRepository;
        private readonly ISongRepository songRepository;
        private readonly IPictureRepository pictureRepository;
        private readonly IPlaylistRepository playlistRepository;

        public AlbumService(IAlbumRepository albumRepository, ISongRepository songRepository, IPictureRepository pictureRepository, IPlaylistRepository playlistRepository)
        {
            this.albumRepository = albumRepository;
            this.songRepository = songRepository;
            this.pictureRepository = pictureRepository;
            this.playlistRepository = playlistRepository;
        }

        public List<AlbumDto> GetAlbums(int userId)
        {
            var albums = albumRepository.GetAlbums(userId);
            albums.Sort((a1, a2) => a1.Title.CompareTo(a2.Title));
            return albums;
        }

        public AlbumDto GetAlbumById(int userId, int id)
        {
            return albumRepository.GetAlbumById(userId, id);
        }

        public List<SongDto> GetSongsOfAlbum(int userId, int albumId)
        {
            var songs = songRepository.GetSongsOfAlbum(userId, albumId);
            songs.Sort((s1, s2) => s1.AlbumIndex.CompareTo(s2.AlbumIndex));
            return songs;
        }

        public async Task<AlbumDto> AddAlbum(int userId, AlbumDto albumDto, int artistId)
        {
            if (!albumRepository.DoesAlbumAlreadyExist(albumDto, artistId))
            {
                var album = new Album
                {
                    Title = albumDto.Title,
                    Description = albumDto.Description,
                    CoverGuid = albumDto.CoverGuid,
                    ReleaseYear = albumDto.ReleaseYear,
                    Genre = albumDto.Genre,
                    ArtistId = artistId,
                };

                return await albumRepository.AddAlbum(album);
            }
            return null;
        }

        public async Task<AlbumDto> EditAlbum(int userId, AlbumDto albumDto)
        {
            var artistId = albumRepository.GetArtistIdForAlbumById(albumDto.Id);

            if (!albumRepository.DoesAlbumAlreadyExist(albumDto, artistId))
            {
                var album = new Album
                {
                    Id = albumDto.Id,
                    Title = albumDto.Title,
                    Description = albumDto.Description,
                    CoverGuid = albumDto.CoverGuid,
                    ReleaseYear = albumDto.ReleaseYear,
                    Genre = albumDto.Genre,
                    ArtistId = artistId,
                };
                return await albumRepository.EditAlbum(album);
            }
            return null;
        }

        public async Task<bool> DeleteAlbumById(int userId, int albumId)
        {
            var songs = GetSongsOfAlbum(userId, albumId);

            var removingSongsFromPlaylists = songs.Select(s => playlistRepository.DeleteSongFromPlaylists(s.Id));

            await Task.WhenAll(removingSongsFromPlaylists);

            var album = albumRepository.GetAlbumById(userId, albumId);

            if (album.CoverGuid != null)
            {
                pictureRepository.DeletePicture(album.CoverGuid.ToString());
            }

            return await albumRepository.DeleteAlbumById(userId, albumId);
        }
    }
}
