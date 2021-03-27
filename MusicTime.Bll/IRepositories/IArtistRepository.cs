﻿using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicTime.Bll.IRepositories
{ 
    public interface IArtistRepository
    {
        List<ArtistDto> GetArtists(int userId);

        ArtistDto GetArtistById(int userId, int id);

        Task<ArtistDto> AddArtist(Artist artist);

        bool DoesArtistAlreadyExist(int userId, string artist);
    }
}
