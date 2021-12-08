using Microsoft.EntityFrameworkCore;
using MusicTime.Bll.Entities;
using System.Security.Cryptography;
using System.Text;
using System;

namespace MusicTime.Dal.EfDbContext
{
    public class MusicTimeDbContext : DbContext
    {
        public MusicTimeDbContext(DbContextOptions<MusicTimeDbContext> options)
            : base(options)
        {
        }

        public DbSet<Song> Songs { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<SongToPlaylist> SongToPlaylistRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("Users")
                .HasKey(s => s.Id);
            modelBuilder.Entity<User>()
                .Property(s => s.UserName).HasMaxLength(50)
                .IsRequired(required: true);
            modelBuilder.Entity<User>()
                .Property(s => s.PasswordHash).HasMaxLength(256)
                .IsRequired(required: true);
            modelBuilder.Entity<User>()
                .Property(s => s.PasswordSalt).HasMaxLength(256)
                .IsRequired(required: true);
            modelBuilder.Entity<User>()
                .HasMany(a => a.Artists)
                .WithOne(a => a.User)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .HasMany(u => u.Playlists)
                .WithOne(p => p.User)
                .OnDelete(DeleteBehavior.Cascade);

            using (var hmac = new HMACSHA512())
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                
                modelBuilder.Entity<User>()
                .HasData(new[]
                {
                    new User() { Id = 1, UserName = "MrUser", PasswordHash = hash, PasswordSalt = hmac.Key },
                });
            }

            modelBuilder.Entity<Playlist>()
                .ToTable("Playlists")
                .HasKey(p => p.Id);
            modelBuilder.Entity<Playlist>()
                .Property(p => p.Title).HasMaxLength(50)
                .IsRequired(required: true).IsUnicode(unicode: true);
            modelBuilder.Entity<Playlist>()
                .Property(p => p.Description).HasMaxLength(256)
                .IsRequired(required: false).IsUnicode(unicode: true);
            modelBuilder.Entity<Playlist>()
                .HasOne(p => p.User)
                .WithMany(u => u.Playlists)
                .HasForeignKey(p => p.UserId)
                .IsRequired(required: true);
            modelBuilder.Entity<Playlist>()
                .HasMany(p => p.PlaylistToSongs)
                .WithOne(pts => pts.Playlist)
                .HasForeignKey(pts => pts.PlaylistId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Playlist>()
                .HasData(new[]
                {
                    new Playlist() { Id = 1, UserId = 1, CoverGuid = new Guid("e364193e-8153-4d93-bd26-78ea6ea511d9"), Title = "Best of X" },
                    new Playlist() { Id = 2, UserId = 1, CoverGuid = new Guid("b03225a0-1ee0-4a7e-a415-1482a0c3d494"), Title = "Best of JUMEX" },
                    new Playlist() { Id = 3, UserId = 1, CoverGuid = new Guid("d4a24114-18b6-4adb-b1d8-02e21b4a6ea5"), Title = "Favourite Rock Songs" },
                });

            modelBuilder.Entity<Artist>()
                .ToTable("Artists")
                .HasKey(s => s.Id);
            modelBuilder.Entity<Artist>()
                .Property(s => s.Name).HasMaxLength(50)
                .IsRequired(required: true).IsUnicode(unicode: true);
            modelBuilder.Entity<Artist>()
                .Property(s => s.Description).HasMaxLength(256)
                .IsRequired(required: false).IsUnicode(unicode: true);
            modelBuilder.Entity<Artist>()
               .HasOne(artist => artist.User)
               .WithMany(user => user.Artists)
               .HasForeignKey(artist => artist.UserId)
               .IsRequired(required: true);
            modelBuilder.Entity<Artist>()
                .HasMany(artist => artist.Albums)
                .WithOne(album => album.Artist)
                .HasForeignKey(album => album.ArtistId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Artist>()
                .HasData(new[]
                {
                    new Artist() { Id = 1, UserId = 1, PictureGuid = new Guid("031a2c98-cb76-4ca7-96f3-a7a336bef06a"), Name = "xxxtentacion" },
                    new Artist() { Id = 2, UserId = 1, PictureGuid = new Guid("becfe262-fce6-4af3-a268-f8f33f87d91e"), Name = "JUMEX" },
                    new Artist() { Id = 3, UserId = 1, PictureGuid = new Guid("75d2b672-ee18-4f12-8a24-59a875cb556b"), Name = "Billy Talent" },
                    new Artist() { Id = 4, UserId = 1, PictureGuid = new Guid("2262eea7-017b-450c-8b56-7692f47c587f"), Name = "Linkin Park" },
                });

            modelBuilder.Entity<Album>()
                .ToTable("Albums")
                .HasKey(t => t.Id);
            modelBuilder.Entity<Album>()
               .Property(t => t.Title).HasMaxLength(50)
               .IsRequired(required: true).IsUnicode(unicode: true);
            modelBuilder.Entity<Album>()
              .Property(t => t.Genre).HasMaxLength(50)
              .IsRequired(required: false).IsUnicode(unicode: true);
            modelBuilder.Entity<Album>()
              .Property(t => t.Description).HasMaxLength(256)
              .IsRequired(required: false).IsUnicode(unicode: true);
            modelBuilder.Entity<Album>()
              .Property(t => t.ReleaseYear)
              .IsRequired(required: false);
            modelBuilder.Entity<Album>()
              .Property(t => t.CoverGuid)
              .IsRequired(required: false);
            modelBuilder.Entity<Album>()
               .HasOne(t => t.Artist)
               .WithMany(a => a.Albums)
               .HasForeignKey(t => t.ArtistId)
               .IsRequired(required: true);
            modelBuilder.Entity<Album>()
                .HasMany(a => a.Songs)
                .WithOne(a => a.Album)
                .HasForeignKey(a => a.AlbumId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Album>()
                .HasData(new[]
                {
                    new Album() { Id = 1, ArtistId = 1, ReleaseYear = 2017, CoverGuid = new Guid("4757d847-8bdf-40a2-8542-d51e76612049"), Title = "17", Genre = "Hip-hop" },
                    new Album() { Id = 2, ArtistId = 2, ReleaseYear = 2019, CoverGuid = new Guid("82e5698d-2600-4532-8fa0-dff52345cd92"), Title = "LONER", Genre = "Emo Rap" },
                    new Album() { Id = 3, ArtistId = 3, ReleaseYear = 2016, CoverGuid = new Guid("07f14ffa-aa70-4786-8e42-4158934facab"), Title = "Afraid of Heights", Genre = "Punk" },
                    new Album() { Id = 4, ArtistId = 4, ReleaseYear = 2000, CoverGuid = new Guid("0bb75a36-1017-4a49-bbba-6b90dbccb08f"), Title = "Hybrid Theory", Genre = "Nu-Metal" },
                });

            modelBuilder.Entity<Song>()
                .ToTable("Songs")
                .HasKey(t => t.Id);
            modelBuilder.Entity<Song>()
               .Property(t => t.Title).HasMaxLength(50)
               .IsRequired(required: true).IsUnicode(unicode: true);
            modelBuilder.Entity<Song>()
               .Property(t => t.Url).HasMaxLength(150)
               .IsRequired(required: true).IsUnicode(unicode: true);
            modelBuilder.Entity<Song>()
               .HasOne(t => t.Album)
               .WithMany(a => a.Songs)
               .HasForeignKey(t => t.AlbumId)
               .IsRequired(required: true);
            modelBuilder.Entity<Song>()
                .HasMany(s => s.SongToPlaylists)
                .WithOne(stp => stp.Song)
                .HasForeignKey(stp => stp.SongId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Song>()
                .HasData(new[]
                {
                    new Song() { Id = 1, AlbumId = 1, AlbumIndex = 1, Title = "The Explanation", Url = "https://www.youtube.com/watch?v=pG-tbrzlMVU" },
                    new Song() { Id = 2, AlbumId = 1, AlbumIndex = 2, Title = "Jocelyn Flores", Url = "https://www.youtube.com/watch?v=FAucVNRx_mU" },
                    new Song() { Id = 3, AlbumId = 1, AlbumIndex = 3, Title = "Depression & Obsession", Url = "https://www.youtube.com/watch?v=yas2vpTPWWY" },
                    new Song() { Id = 4, AlbumId = 1, AlbumIndex = 4, Title = "Everybody Dies In Their Nightmares", Url = "https://www.youtube.com/watch?v=7JGDWKJfgxQ" },
                    new Song() { Id = 5, AlbumId = 1, AlbumIndex = 5, Title = "Revenge", Url = "https://www.youtube.com/watch?v=CD_tD26E7k0" },
                    new Song() { Id = 6, AlbumId = 1, AlbumIndex = 6, Title = "Save Me", Url = "https://www.youtube.com/watch?v=-8xdDaRFdwc" },
                    new Song() { Id = 7, AlbumId = 1, AlbumIndex = 7, Title = "Dead Inside (Interlude)", Url = "https://www.youtube.com/watch?v=UgZyhGU8r04" },
                    new Song() { Id = 8, AlbumId = 1, AlbumIndex = 8, Title = "Fuck Love (ft. Trippie Redd)", Url = "https://www.youtube.com/watch?v=JcWOSgImiRw" },
                    new Song() { Id = 9, AlbumId = 1, AlbumIndex = 9, Title = "Carry On", Url = "https://www.youtube.com/watch?v=EhTH8OIPoY4" },
                    new Song() { Id = 10, AlbumId = 1, AlbumIndex = 10, Title = "Orlando", Url = "https://www.youtube.com/watch?v=cnNfYsfyiMc" },
                    new Song() { Id = 11, AlbumId = 1, AlbumIndex = 11, Title = "Ayala (Outro)", Url = "https://www.youtube.com/watch?v=KbxlSQVWbDw" },

                    new Song() { Id = 12, AlbumId = 2, AlbumIndex = 1, Title = "INTRO (POPI SCOVILLE)", Url = "https://soundcloud.com/lovejumex/01-intro-popi-scoville" },
                    new Song() { Id = 13, AlbumId = 2, AlbumIndex = 2, Title = "R U DOWN", Url = "https://soundcloud.com/lovejumex/r-u-down" },
                    new Song() { Id = 14, AlbumId = 2, AlbumIndex = 3, Title = "TRAPPED", Url = "https://soundcloud.com/lovejumex/jumex-trapped" },
                    new Song() { Id = 15, AlbumId = 2, AlbumIndex = 4, Title = "LONER", Url = "https://soundcloud.com/lovejumex/jumex-loner" },
                    new Song() { Id = 16, AlbumId = 2, AlbumIndex = 5, Title = "WISH ME DEATH", Url = "https://soundcloud.com/lovejumex/wish-me-death" },
                    new Song() { Id = 17, AlbumId = 2, AlbumIndex = 6, Title = "ALIVE IN MY COFFIN", Url = "https://soundcloud.com/lovejumex/alive-in-my-coffin" },
                    new Song() { Id = 18, AlbumId = 2, AlbumIndex = 7, Title = "BILLIE EILISH", Url = "https://soundcloud.com/lovejumex/billie-eilish" },

                    new Song() { Id = 19, AlbumId = 3, AlbumIndex = 1, Title = "Louder Than the DJ", Url = "https://www.youtube.com/watch?v=NM6PA9dwDRY" },
                    new Song() { Id = 20, AlbumId = 4, AlbumIndex = 1, Title = "Crawling", Url = "https://www.youtube.com/watch?v=Gd9OhYroLN0" },
                });

            modelBuilder.Entity<SongToPlaylist>()
                .ToTable("SongToPlaylist")
                .HasKey(sp => sp.Id);

            modelBuilder.Entity<SongToPlaylist>()
                .HasOne(sp => sp.Playlist)
                .WithMany(p => p.PlaylistToSongs)
                .HasForeignKey(sp => sp.PlaylistId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SongToPlaylist>()
                .HasOne(sp => sp.Song)
                .WithMany(s => s.SongToPlaylists)
                .HasForeignKey(sp => sp.SongId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SongToPlaylist>()
                .HasData(new[]
                {
                    new SongToPlaylist() {Id = 1, SongId = 2, PlaylistId = 1},
                    new SongToPlaylist() {Id = 2, SongId = 4, PlaylistId = 1},
                    new SongToPlaylist() {Id = 3, SongId = 8, PlaylistId = 1},
                    new SongToPlaylist() {Id = 4, SongId = 9, PlaylistId = 1},
                    new SongToPlaylist() {Id = 5, SongId = 10, PlaylistId = 1},

                    new SongToPlaylist() {Id = 6, SongId = 15, PlaylistId = 2},
                    new SongToPlaylist() {Id = 7, SongId = 17, PlaylistId = 2},
                    new SongToPlaylist() {Id = 8, SongId = 18, PlaylistId = 2},

                    new SongToPlaylist() {Id = 9, SongId = 19, PlaylistId = 3},
                    new SongToPlaylist() {Id = 10, SongId = 20, PlaylistId = 3},
                });
        }
    }
}
