using Bansi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase parcial para modelado de datos en BD
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/06/2024
    internal partial class BDICredContext : DbContext
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="modelBuilder"></param>
        /// <exception cref="ArgumentNullException"></exception>
        private partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            if (modelBuilder == null) throw new ArgumentNullException(nameof(modelBuilder));

            modelBuilder.TrimEnd();
        }

    }
}
