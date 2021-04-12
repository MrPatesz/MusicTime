﻿using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.Services
{
    public class SongService
    {
        private readonly ISongRepository songRepository;

        public SongService(ISongRepository repository)
        {
            this.songRepository = repository;
        }

        public List<SongDto> GetSongs(int userId)
        {
            return songRepository.GetSongs(userId);
        }

        public async Task<bool> DeleteSongById(int userId, int songId)
        {
            return await songRepository.DeleteSongById(userId, songId);
        }

        public async Task<SongDto> AddSong(int userId, SongDto songDto, int albumId)
        {
            if (!songRepository.DoesSongAlreadyExist(userId, songDto, albumId))
            {
                var song = new Song
                {
                    Title = songDto.Title,
                    AlbumId = albumId,
                };

                return await songRepository.AddSong(song);
            }
            return null;
        }
    }
}
