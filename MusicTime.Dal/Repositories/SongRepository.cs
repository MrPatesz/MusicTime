using MusicTime.Bll.Dtos;
using MusicTime.Dal.EfDbContext;
using MusicTime.Bll.Entities;
using System.Collections.Generic;
using System.Linq;
using MusicTime.Bll.IRepositories;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicTime.Dal.Repositories
{
    public class SongRepository : ISongRepository
    {
        private readonly MusicTimeDbContext dbContext;

        public SongRepository(MusicTimeDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public SongDto GetSong(int songId)
        {
            return dbContext.Songs.Where(s => s.Id == songId).Select(ToDto).ToList()[0];
        }

        public List<SongDto> GetSongs(int userId)
        {
            return dbContext.Songs.Where(s => s.Album.Artist.UserId == userId).Select(ToDto).ToList();
        }

        public List<SongDto> GetSongsOfAlbum(int userId, int albumId)
        {
            return dbContext.Songs.Where(s => s.AlbumId == albumId && s.Album.Artist.UserId == userId).Select(ToDto).ToList();
        }

        public List<SongDto> GetSongsOfPlaylist(int userId, int playlistId)
        {
            return dbContext.SongToPlaylistRecords.Where(stp => stp.Playlist.UserId == userId && stp.PlaylistId  == playlistId).Select(stp => ToDto(stp.Song)).ToList();
        }

        public async Task<bool> DeleteSongById(int userId, int songId)
        {
            var toRemove = dbContext.Songs.FirstOrDefault(a => a.Id == songId && a.Album.Artist.UserId == userId);

            if (toRemove != null) 
            {
                dbContext.Songs.Remove(toRemove);
                await dbContext.SaveChangesAsync();
                return true;
            }
            else return false;
        }

        public bool DoesSongAlreadyExist(int userId, SongDto songDto, int albumId)
        {
            return dbContext.Songs.Any(a => a.Title == songDto.Title && a.AlbumId == albumId && a.Id != songDto.Id);
        }

        public async Task<SongDto> AddSong(Song song)
        {
            dbContext.Songs.Add(song);
            await dbContext.SaveChangesAsync();

            return ToDto(song);
        }

        public List<DetailedSongDto> GetDetailedSongs(int userId)
        {
            return dbContext.Songs
                .Include(s => s.Album)
                .Include(s => s.Album.Artist)
                .Where(s => s.Album.Artist.UserId == userId)
                .Select(ToDetailedDto).ToList();
        }

        public List<DetailedSongDto> GetDetailedSongsOfPlaylist(int userId, int playlistId)
        {
            return dbContext.SongToPlaylistRecords
                .Include(s => s.Song.Album)
                .Include(s => s.Song.Album.Artist)
                .Where(stp => stp.Playlist.UserId == userId && stp.PlaylistId == playlistId)
                .Select(stp => stp.Song)
                .Select(ToDetailedDto)
                .ToList();
        }

        public async Task<SongDto> EditSong(Song song)
        {
            var toEdit = dbContext.Songs.FirstOrDefault(s => s.Id == song.Id);

            toEdit.Title = song.Title;
            toEdit.Url = song.Url;
            toEdit.AlbumId = song.AlbumId;
            toEdit.AlbumIndex = song.AlbumIndex;

            dbContext.Songs.Update(toEdit);

            await dbContext.SaveChangesAsync();

            return ToDto(toEdit);
        }

        public async Task<bool> SongAddedTo(int albumId, int albumIndex)
        {
            var toUpdate = dbContext.Songs.Where(s => s.AlbumId == albumId && s.AlbumIndex >= albumIndex).ToList();

            if(toUpdate.Count > 0)
            {
                toUpdate.ForEach(s => s.AlbumIndex++);
                dbContext.Songs.UpdateRange(toUpdate);
                await dbContext.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> SongMovedFromTo(int albumId, int from, int to)
        {
            if (from > to)
            {
                var toUpdate = dbContext.Songs.Where(s => s.AlbumId == albumId && s.AlbumIndex >= to && s.AlbumIndex < from).ToList();

                if (toUpdate.Count > 0)
                {
                    toUpdate.ForEach(s => s.AlbumIndex++);
                    dbContext.Songs.UpdateRange(toUpdate);
                    await dbContext.SaveChangesAsync();

                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                var toUpdate = dbContext.Songs.Where(s => s.AlbumId == albumId && s.AlbumIndex <= to && s.AlbumIndex > from).ToList();

                if (toUpdate.Count > 0)
                {
                    toUpdate.ForEach(s => s.AlbumIndex--);
                    dbContext.Songs.UpdateRange(toUpdate);
                    await dbContext.SaveChangesAsync();

                    return true;
                }
                else
                {
                    return false;
                }
            }            
        }

        public async Task<bool> SongRemovedFrom(int albumId, int albumIndex)
        {
            var toUpdate = dbContext.Songs.Where(s => s.AlbumId == albumId && s.AlbumIndex > albumIndex).ToList();

            if (toUpdate.Count > 0)
            {
                toUpdate.ForEach(s => s.AlbumIndex--);
                dbContext.Songs.UpdateRange(toUpdate);
                await dbContext.SaveChangesAsync();

                return true;
            }
            else
            {
                return false;
            }
        }

        public int GetAlbumIdOfSong(int songId)
        {
            var song = dbContext.Songs.First(s => s.Id == songId);

            return song.AlbumId;
        }

        private SongDto ToDto(Song value)
        {
            return new SongDto
            {
                Id = value.Id,
                Title = value.Title,
                Url = value.Url,
                AlbumIndex = value.AlbumIndex
            };
        }

        private DetailedSongDto ToDetailedDto(Song value)
        {
            return new DetailedSongDto
            {
                SongId = value.Id,
                SongTitle = value.Title,
                Url = value.Url,
                AlbumId = value.AlbumId,
                AlbumTitle = value.Album.Title,
                ArtistId = value.Album.ArtistId,
                ArtistName = value.Album.Artist.Name,
            };
        }
    }
}
