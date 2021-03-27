using MusicTime.Bll.Dtos;
using System.Collections.Generic;

namespace MusicTime.Bll.IRepositories
{
    public interface IAlbumRepository
    {
        List<AlbumDto> GetAlbums(int userId);
        AlbumDto GetAlbumById(int userId, int id);
        List<AlbumDto> GetAlbumsOfArtist(int userId, int artistId);
    }
}
