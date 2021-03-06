using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.IRepositories
{
    public interface IAlbumRepository
    {
        List<AlbumDto> GetAlbums(int userId);

        AlbumDto GetAlbumById(int userId, int id);

        List<AlbumDto> GetAlbumsOfArtist(int userId, int artistId);

        Task<AlbumDto> AddAlbum(Album album);

        bool DoesAlbumAlreadyExist(AlbumDto albumDto, int artistId);

        Task<bool> DeleteAlbumById(int userId, int albumId);

        int GetArtistIdForAlbumById(int albumId);

        Task<AlbumDto> EditAlbum(Album album);
    }
}
