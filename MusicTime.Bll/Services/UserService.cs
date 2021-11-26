using MusicTime.Bll.Dtos;
using MusicTime.Bll.Entities;
using MusicTime.Bll.IRepositories;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace MusicTime.Bll.Services
{
    public class UserService
    {
        private readonly IUserRepository userRepository;
        private readonly IConfiguration configuration;
        private readonly JwtSecurityTokenHandler tokenHandler;

        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            this.userRepository = userRepository;
            this.configuration = configuration;
            this.tokenHandler = new JwtSecurityTokenHandler();
        }

        public async Task<bool> Register(UserDto userDto)
        {
            if (!userRepository.IsUsernameTaken(userDto.UserName))
            {
                using (var hmac = new HMACSHA512())
                {
                    var user = new User
                    { 
                        UserName = userDto.UserName,
                        PasswordSalt = hmac.Key,
                        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password))
                    };

                    await userRepository.AddUser(user);
                }
                return true;
            }
            return false;
        }

        public string Login(UserDto userDto)
        {
            var dbUser = userRepository.GetUserByUsername(userDto.UserName);

            if (dbUser == null)
                return null;

            using (var hmac = new HMACSHA512(dbUser.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
                if (dbUser.PasswordHash.SequenceEqual(computedHash))
                    return GenerateJWTToken(dbUser);
                else
                    return null;
            }
        }

        public async Task<bool> ChangePassword(PasswordChangeDto passwordChangeDto)
        {
            var dbUser = userRepository.GetUserByUsername(passwordChangeDto.UserName);

            if (dbUser == null)
                return false;

            using (var hmac = new HMACSHA512(dbUser.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordChangeDto.CurrentPassword));
                if (dbUser.PasswordHash.SequenceEqual(computedHash))
                {
                    var newHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordChangeDto.NewPassword));
                    await userRepository.ChangePassword(passwordChangeDto.UserName, newHash);
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        //Katona Tamás KocsmApp
        private string GenerateJWTToken(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Token").Value;
            var keyBytes = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName),
                }),
                Expires = DateTime.Now.AddHours(12),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(keyBytes),
                    SecurityAlgorithms.HmacSha512Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        //Katona Tamás KocsmApp
    }
}