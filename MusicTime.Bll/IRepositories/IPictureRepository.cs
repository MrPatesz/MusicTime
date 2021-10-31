using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace MusicTime.Bll.IRepositories
{
    public interface IPictureRepository
    {
        Task<string> SavePicture(IFormFile file, Guid pictureGuid);

        void DeletePicture(string fileName);
    }
}
