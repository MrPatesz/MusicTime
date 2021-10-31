using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using MusicTime.Bll.IRepositories;
using System;
using System.IO;
using System.Threading.Tasks;

namespace MusicTime.Dal.Repositories
{
    public class PictureRepository : IPictureRepository
    {
        private readonly string directory;

        public PictureRepository(IWebHostEnvironment environment)
        {
            directory = environment.WebRootPath + "\\Pictures\\";
        }

        public void DeletePicture(string fileName)
        {
            var toDelete = $"{directory}{fileName}.png";
            if (File.Exists(toDelete))
            {
                File.Delete(toDelete);
            }
        }

        public async Task<string> SavePicture(IFormFile file, Guid pictureGuid)
        {
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            string fileName = $"{pictureGuid}.png";

            using (FileStream fileStream = File.Create(directory + fileName))
            {
                await file.CopyToAsync(fileStream);
                await fileStream.FlushAsync();
            }

            return fileName;
        }
    }
}
