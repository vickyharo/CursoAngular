using Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred;
using Bansi.Data.Queries;
using Bansi.EntityFrameworkCore;
using Bansi.EntityFrameworkCore.Common;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    public class vwSolicitudCambioLineaQueries
    {
        #region Métodos

        /// <summary>
        /// Método para la consulta de solicitudes de cambio de línea
        /// </summary>
        /// <param name="idEstatus"></param>
        /// <param name="numeroLinea"></param>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public List<VwSolicitudCambioLinea> ConsultarSolicitudesCambioLinea(int idEstatus, string numeroLinea, DateTime _fechaRegistroInicio, DateTime _fechaRegistroFin)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> contexto = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();

                    if (idEstatus > decimal.Zero)
                    {
                        query.And(new Query(nameof(VwSolicitudCambioLinea.IdEstatus), QueryOperator.Equals, idEstatus));
                    }

                    if (numeroLinea.IsNotNullOrEmpty())
                    {
                        query.And(new Query(nameof(VwSolicitudCambioLinea.NumeroLinea), QueryOperator.Equals, numeroLinea));
                    }

                    if (_fechaRegistroInicio != new DateTime() && _fechaRegistroFin != new DateTime())
                    {

                        query.And(new Query(nameof(VwSolicitudCambioLinea.FechaSolicitud), QueryOperator.GreaterOrEquals, _fechaRegistroInicio));
                        query.And(new Query(nameof(VwSolicitudCambioLinea.FechaSolicitud), QueryOperator.LessOrEquals, _fechaRegistroFin));
                    }

                    return (query.Count > 0) ?
                        contexto.Execute(x => x.VwSolicitudCambioLinea.Where(query.ToExpresion<VwSolicitudCambioLinea>())).ToList() :
                        contexto.DbContext.VwSolicitudCambioLinea.AsEnumerable().ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, idEstatus, numeroLinea);
                throw;
            }
        }

        #endregion Métodos
    }
}
