using Bansi.EntityFrameworkCore.Common;
using Bansi.EntityFrameworkCore;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase para consultas de la tabla
    /// </summary>
    /// Jorge alejandro Ruiz Murillo, 11/06/2024
    public class tblEstatusSolicitudCambioCuentaQueries
    {

        #region Metodos

        /// <summary>
        /// Obtiene los estatus de solicitud de cambio de cuentas
        /// </summary>
        /// <returns></returns>
        public List<Modelo.DataModels.BdiCred.Tblestatussolicitudcambiocuenta> ObtenerEstatusSolicitudCambioCuenta()
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    return bdiCredContext.DbContext.TblEstatusSolicitudCambioCuentas.AsEnumerable().ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        #endregion Metodos

    }
}
