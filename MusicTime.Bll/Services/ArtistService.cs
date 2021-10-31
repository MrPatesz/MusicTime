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
        private readonly IPictureRepository pictureRepository;

        public ArtistService(IArtistRepository artistRepository, IAlbumRepository albumRepository, ISongRepository songRepository, IPictureRepository pictureRepository)
        {
            this.artistRepository = artistRepository;
            this.albumRepository = albumRepository;
            this.songRepository = songRepository;
            this.pictureRepository = pictureRepository;
        }

        public List<ArtistDto> GetArtists(int userId)
        {
            var artists = artistRepository.GetArtists(userId);
            artists.Sort((a1, a2) => a1.Name.CompareTo(a2.Name));
            return artists;
        }

        public ArtistDto GetArtistById(int userId, int id)
        {
            return artistRepository.GetArtistById(userId, id);
        }

        public List<AlbumDto> GetAlbumsOfArtist(int userId, int artistId)
        {
            var albums = albumRepository.GetAlbumsOfArtist(userId, artistId);
            albums.Sort((a1, a2) => a1.Title.CompareTo(a2.Title));
            return albums;
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

            songs.Sort((s1, s2) => s1.Title.CompareTo(s2.Title));

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
            var albums = albumRepository.GetAlbumsOfArtist(userId, artistId);

            albums.ForEach(a =>
            {
                if (a.CoverGuid != null)
                {
                    pictureRepository.DeletePicture(a.CoverGuid.ToString());
                }
            });

            var toDelete = artistRepository.GetArtistById(userId, artistId);

            if (toDelete.PictureGuid != null)
            {
                pictureRepository.DeletePicture(toDelete.PictureGuid.ToString());
            }

            return await artistRepository.DeleteArtistById(userId, artistId);
        }
    }
}
