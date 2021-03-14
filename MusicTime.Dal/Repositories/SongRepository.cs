﻿using MusicTime.Bll.Dtos;
using MusicTime.Dal.EfDbContext;
using MusicTime.Bll.Entities;
using System.Collections.Generic;
using System.Linq;
using MusicTime.Bll.IRepositories;

namespace MusicTime.Dal.Repositories
{
    public class SongRepository : ISongRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public SongRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<SongDto> GetSongs()
        {
            return dbContext.Songs.Select(ToDto).ToList();
        }

        public List<SongDto> GetSongsOfAlbum(int albumId)
        {
            return dbContext.Songs.Where(a => a.AlbumId == albumId).Select(ToDto).ToList();
        }

        private SongDto ToDto(Song value)
        {
            return new SongDto
            {
                Id = value.Id,
                Title = value.Title
            };
        }
    }
}
