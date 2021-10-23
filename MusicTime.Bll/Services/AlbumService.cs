using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class AlbumService
    {
        private readonly IAlbumRepository albumRepository;
        private readonly ISongRepository songRepository;

        public AlbumService(IAlbumRepository albumRepository, ISongRepository songRepository)
        {
            this.albumRepository = albumRepository;
            this.songRepository = songRepository;
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
            songs.Sort((s1, s2) => s1.Title.CompareTo(s2.Title));
            return songs;
        }

        public async Task<AlbumDto> AddAlbum(int userId, AlbumDto albumDto, int artistId)
        {
            // useré-e ez az artist??
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
            var songsToDelete = songRepository.GetSongsOfAlbum(userId, albumId);

            songsToDelete.ForEach(async song => await songRepository.DeleteSongById(userId, song.Id));

            return await albumRepository.DeleteAlbumById(userId, albumId);
        }
    }
}
