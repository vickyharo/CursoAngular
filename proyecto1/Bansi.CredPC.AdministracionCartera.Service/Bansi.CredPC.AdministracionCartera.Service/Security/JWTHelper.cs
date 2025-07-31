using Bansi.CredPC.AdministracionCartera.Service.Negocio.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Bansi.CredPC.AdministracionCartera.Service.Constants.CommonConstants;

namespace Bansi.CredPC.AdministracionCartera.Service.Security
{
    /// <summary>
    /// Helper to manage JWT methods
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 18/02/2024
    internal static class JWTHelper
    {
        /// <summary>
        /// Generate a valid service token
        /// </summary>
        /// <param name="programConfiguration"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        public static string GenerateTokenApplication(IConfiguration programConfiguration, string userName, string clientAppName)
        {
            int expirationTime = ParameterHelperBdiCred.GetParameter<int>(ParameterNames.TIEMPO_EXPIRACION_TOKEN, false);

            IConfigurationSection jwtSettings = programConfiguration.GetSection(JwtConfigConst.SectionName);

            string guidIdSession = GenerateStringGUID();

            Claim[] claims = new Claim[]
            {
                new(JwtRegisteredClaimNames.Jti, guidIdSession),
                new(JwtRegisteredClaimNames.NameId, guidIdSession),
                new(JwtConfigConst.ClaimUserName, userName),
                new(JwtConfigConst.ClaimAppName, clientAppName)
            };

            SecurityTokenDescriptor tokenDescription = new()
            {
                Subject = new ClaimsIdentity(claims),
                NotBefore = DateTimeOffset.UtcNow.UtcDateTime,
                Expires = DateTimeOffset.UtcNow.UtcDateTime.AddMinutes(expirationTime),
                SigningCredentials = new SigningCredentials(GenerateSecretKey(), SecurityAlgorithms.HmacSha256),
                Issuer = jwtSettings.GetValue<string>(JwtConfigConst.Issuer),
                Audience = jwtSettings.GetValue<string>(JwtConfigConst.Audience)
            };

            JwtSecurityTokenHandler handlerToken = new();
            SecurityToken token = handlerToken.CreateToken(tokenDescription);

            return handlerToken.WriteToken(token);
        }

        /// <summary>
        /// Generates new GUID
        /// </summary>
        /// <returns></returns>
        private static string GenerateStringGUID()
        {
            return Guid.NewGuid().ToString();
        }

        /// <summary>
        /// Generates a secret key to JWT
        /// </summary>
        /// <param name="jwtConfigSection"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public static SymmetricSecurityKey GenerateSecretKey()
        {
            string secretKey = ParameterHelperBdiCred.GetParameter<string>(ParameterNames.LLAVE_GENERACION_TOKEN).Trim();

            if (string.IsNullOrEmpty(secretKey)) throw new ArgumentException("No se obtuvieron los parametros necesarios para la generación de Token.");

            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
        }
    }
}