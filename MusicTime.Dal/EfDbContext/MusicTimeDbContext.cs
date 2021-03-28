using Microsoft.EntityFrameworkCore;
using MusicTime.Bll.Entities;
using System.Security.Cryptography;
using System.Text;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToTable("Users");
            modelBuilder.Entity<User>()
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
                .WithOne(a => a.User);

            using (var hmac = new HMACSHA512())
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
                
                modelBuilder.Entity<User>()
                .HasData(new[]
                {
                    new User() { Id = 1, UserName = "admin", PasswordHash = hash, PasswordSalt = hmac.Key },
                    new User() { Id = 2, UserName = "user1", PasswordHash = hash, PasswordSalt = hmac.Key },
                });
            }
                

            modelBuilder.Entity<Artist>()
                .ToTable("Artists");
            modelBuilder.Entity<Artist>()
                .HasKey(s => s.Id);
            modelBuilder.Entity<Artist>()
                .Property(s => s.Name).HasMaxLength(50)
                .IsRequired(required: true).IsUnicode(unicode: true);
            modelBuilder.Entity<Artist>()
                .Property(s => s.Description).HasMaxLength(256)
                .IsRequired(required: false).IsUnicode(unicode: true);
            modelBuilder.Entity<Artist>()
               .HasOne(t => t.User)
               .WithMany(a => a.Artists)
               .HasForeignKey(t => t.UserId)
               .IsRequired(required: true);
            modelBuilder.Entity<Artist>()
                .HasMany(a => a.Albums)
                .WithOne(a => a.Artist);

            modelBuilder.Entity<Artist>()
                .HasData(new[]
                {
                    new Artist() { Id = 1, Name = "xxxtentacion", UserId = 1 },
                    new Artist() { Id = 2, Name = "JUMEX", UserId = 1 },
                    new Artist() { Id = 3, Name = "Billy Talent", UserId = 2 },
                    new Artist() { Id = 4, Name = "Linkin Park", UserId = 2 },
                });

            modelBuilder.Entity<Album>()
                .ToTable("Albums");
            modelBuilder.Entity<Album>()
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
                .HasData(new[]
                {
                    new Album() { Id = 1, Title = "17", Genre = "Hip-hop", ArtistId = 1, ReleaseYear = 2017},
                    new Album() { Id = 2, Title = "Afraid of Heights", Genre = "Punk", ArtistId = 3, ReleaseYear = 2016 },
                });

            modelBuilder.Entity<Song>()
                .ToTable("Songs");
            modelBuilder.Entity<Song>()
               .HasKey(t => t.Id);
            modelBuilder.Entity<Song>()
               .Property(t => t.Title).HasMaxLength(50)
               .IsRequired(required: true).IsUnicode(unicode: true);
            modelBuilder.Entity<Song>()
               .HasOne(t => t.Album)
               .WithMany(a => a.Songs)
               .HasForeignKey(t => t.AlbumId)
               .IsRequired(required: true);

            modelBuilder.Entity<Song>()
                .HasData(new[]
                {
                    new Song() { Id = 1, Title = "Orlando", AlbumId = 1},
                    new Song() { Id = 2, Title = "Louder Than the DJ", AlbumId = 2 },
                });
        }
    }
}
