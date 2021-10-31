using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MusicTime.Dal.Repositories;
using MusicTime.Bll.IRepositories;
using MusicTime.Dal.EfDbContext;
using Microsoft.EntityFrameworkCore;
using MusicTime.Bll.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace MusicTime.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MusicTimeDbContext>(opt =>
                opt.UseSqlServer(@"Data Source=(localdb)\mssqllocaldb;Initial Catalog=MusicTimeDataBase;Integrated Security=True"));

            services.AddScoped<SongService, SongService>();
            services.AddScoped<AlbumService, AlbumService>();
            services.AddScoped<ArtistService, ArtistService>();
            services.AddScoped<UserService, UserService>();
            services.AddScoped<PlaylistService, PlaylistService>();
            services.AddScoped<PictureService, PictureService>();

            services.AddScoped<ISongRepository, SongRepository>();
            services.AddScoped<IAlbumRepository, AlbumRepository>();
            services.AddScoped<IArtistRepository, ArtistRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            services.AddScoped<IPictureRepository, PictureRepository>();

            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins("http://localhost:3000")
                        .AllowCredentials());
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MusicTime.Api", Version = "v1" });
            });

            //Katona Tamás KocsmApp
            var secretKey = Configuration.GetSection("AppSettings:Token").Value;
            var keyBytes = Encoding.ASCII.GetBytes(secretKey);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            //Katona Tamás KocsmApp
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MusicTime.Api v1"));
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
