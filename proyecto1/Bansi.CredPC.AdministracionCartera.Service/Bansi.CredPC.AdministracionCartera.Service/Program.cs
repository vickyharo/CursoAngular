using Bansi.CredPC.AdministracionCartera.Service.Modelo.Interfaces;
using Bansi.CredPC.AdministracionCartera.Service.Negocio.BusinessLogic;
using Bansi.CredPC.AdministracionCartera.Service.Security;
using Bansi.Reflection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using static Bansi.CredPC.AdministracionCartera.Service.Constants.CommonConstants;

namespace Bansi.CredPC.AdministracionCartera.Service
{
    /// <summary>
    /// Init class
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Main method to execute
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            AssemblyResolverHelper.Start();
            Run(args);
        }

        /// <summary>
        /// Run service application
        /// </summary>
        /// <param name="args"></param>
        private static void Run(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(setup =>
            {
                setup.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme.<br/>
                        Ingresa 'Bearer' [space] y tu token en el recuadro de abajo.<br/>
                        Ejemplo: Bearer miToken1234...",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                setup.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });

            //ENDPOINTS
            builder.Services.AddScoped<IBusinessAccess, BusinessAccess>();

            //JWT CONFIGURATION
            IConfigurationSection jwtConfig = builder.Configuration.GetSection(JwtConfigConst.SectionName);

            //JWT CONFIGURATION
            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(jwt =>
            {
                jwt.SaveToken = true;

                jwt.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = JWTHelper.GenerateSecretKey(),
                    ValidateIssuer = true,
                    ValidIssuer = jwtConfig.GetValue<string>(JwtConfigConst.Issuer),
                    ValidateAudience = true,
                    ValidAudience = jwtConfig.GetValue<string>(JwtConfigConst.Audience),
                    RequireExpirationTime = false,
                    ValidateLifetime = true,
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(opc => opc.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}