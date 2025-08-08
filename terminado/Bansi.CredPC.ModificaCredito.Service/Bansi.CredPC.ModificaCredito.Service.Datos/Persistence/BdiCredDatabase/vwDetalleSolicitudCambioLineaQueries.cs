using Bansi.Data.Queries;
using Bansi.EntityFrameworkCore;
using Bansi.EntityFrameworkCore.Common;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    public class vwDetalleSolicitudCambioLineaQueries
    {
        /// <summary>
        /// Obtiene el detalle de la solicitud de cambio de línea
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public Modelo.DataModels.BdiCred.VwDetalleSolicitudCambioLinea ConsultarDetalleSolicitudLinea(int idSolicitud)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> contexto = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();

                    query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwDetalleSolicitudCambioLinea.IdSolicitud), QueryOperator.Equals, idSolicitud));

                    return contexto.Execute(x => x.VwDetalleSolicitudCambioLinea.Where(query.ToExpresion<Modelo.DataModels.BdiCred.VwDetalleSolicitudCambioLinea>())).FirstOrDefault()
                        ?? throw new ArgumentNullException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(ConsultarDetalleSolicitudLinea)}"); ;
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, idSolicitud);
                throw;
            }
        }
    }
}
