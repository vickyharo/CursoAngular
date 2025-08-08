using Bansi.EntityFrameworkCore.Common;
using Bansi.EntityFrameworkCore;
using Bansi.Data.Queries;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase para consultas a la vista
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/06/2024
    public class vwDetalleSolicitudCambioCuentaQueries
    {
        
        /// <summary>
        /// Obtiene el detalle de una solicitud de cambio de cuenta
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <returns></returns>
        public List<Modelo.DataModels.BdiCred.Vwdetallesolicitudcambiocuenta> ConsultarDetalleSolicitud(int idSolicitud)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();
                    query.And(new Query(nameof(Modelo.DataModels.BdiCred.Vwdetallesolicitudcambiocuenta.Idsolicitud), QueryOperator.Equals, idSolicitud));

                    return bdiCredContext.Execute(x => x.VwDetalleSolicitudCambioCuenta.Where(query.ToExpresion<Modelo.DataModels.BdiCred.Vwdetallesolicitudcambiocuenta>())).ToList();
                }
            }
            catch(Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, idSolicitud);

                throw;
            }

        }

    }
}
