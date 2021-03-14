using MusicTime.Bll.Dtos;
using System.Collections.Generic;

namespace MusicTime.Bll.IRepositories
{
    public interface IAlbumRepository
    {
        List<AlbumDto> GetAlbums();
        AlbumDto GetAlbumById(int id);
        List<AlbumDto> GetAlbumsOfArtist(int artistId);
    }
}
