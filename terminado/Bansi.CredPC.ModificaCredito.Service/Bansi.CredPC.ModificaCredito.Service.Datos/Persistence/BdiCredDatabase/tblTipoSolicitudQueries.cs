
using Bansi.EntityFrameworkCore;
using Bansi.EntityFrameworkCore.Common;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    public class tblTipoSolicitudQueries
    {
        #region Métodos

        /// <summary>
        /// Obtiene el tipo de solicitudes
        /// </summary>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public List<Modelo.DataModels.BdiCred.TblTipoSolicitud> ObtenerTipoSolicitudes()
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    return bdiCredContext.DbContext.TblTipoSolicituds.AsEnumerable().ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        #endregion Métodos
    }
}
