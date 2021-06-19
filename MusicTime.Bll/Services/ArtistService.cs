using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class ArtistService
    {
        private readonly IArtistRepository artistRepository;
        private readonly IAlbumRepository albumRepository;
        private readonly ISongRepository songRepository;

        public ArtistService(IArtistRepository artistRepository, IAlbumRepository albumRepository, ISongRepository songRepository)
        {
            this.artistRepository = artistRepository;
            this.albumRepository = albumRepository;
            this.songRepository = songRepository;
        }

        public List<ArtistDto> GetArtists(int userId)
        {
            return artistRepository.GetArtists(userId);
        }

        public ArtistDto GetArtistById(int userId, int id)
        {
            return artistRepository.GetArtistById(userId, id);
        }

        public List<AlbumDto> GetAlbumsOfArtist(int userId, int artistId)
        {
            return albumRepository.GetAlbumsOfArtist(userId, artistId);
        }

        public List<SongDto> GetSongsOfArtist(int userId, int artistId)
        {
            var albums = albumRepository.GetAlbumsOfArtist(userId, artistId);

            var songs = new List<SongDto>();

            albums.ForEach(a =>
            {
                var songsOfAlbum = songRepository.GetSongsOfAlbum(userId, a.Id);

                songsOfAlbum.ForEach(s => songs.Add(s));
            });

            return songs;
        }

        public async Task<ArtistDto> AddArtist(int userId, ArtistDto artistDto)
        {
            if (!artistRepository.DoesArtistAlreadyExist(userId, artistDto))
            {
                var artist = new Artist
                {
                    Name = artistDto.Name,
                    Description = artistDto.Description,
                    PictureGuid = artistDto.PictureGuid,
                    UserId = userId
                };

                return await artistRepository.AddArtist(artist);
            }
            return null;
        }

        public async Task<ArtistDto> EditArtist(int userId, ArtistDto artistDto)
        {
            if (!artistRepository.DoesArtistAlreadyExist(userId, artistDto))
            {
                var artist = new Artist
                {
                    Id = artistDto.Id,
                    Name = artistDto.Name,
                    Description = artistDto.Description,
                    PictureGuid = artistDto.PictureGuid,
                    UserId = userId
                };
                return await artistRepository.EditArtist(userId, artist);
            }
            return null;
        }

        public async Task<bool> DeleteArtistById(int userId, int artistId)
        {
            var albumsToDelete = albumRepository.GetAlbumsOfArtist(userId, artistId);

            albumsToDelete.ForEach(a =>
            {
                var songsToDelete = songRepository.GetSongsOfAlbum(userId, a.Id);

                songsToDelete.ForEach(s => songRepository.DeleteSongById(userId, s.Id));

                albumRepository.DeleteAlbumById(userId, a.Id); 
            });

            return await artistRepository.DeleteArtistById(userId, artistId);
        }
    }
}
