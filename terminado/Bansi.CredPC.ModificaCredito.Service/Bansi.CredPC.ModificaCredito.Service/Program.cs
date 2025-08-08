using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using Bansi.CredPC.ModificaCredito.Service.Negocio.BusinessLogic;
using Bansi.Reflection;
using Microsoft.OpenApi.Models;

namespace Bansi.CredPC.ModificaCredito.Service
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