using Bansi.Data.Queries;
using Bansi.EntityFrameworkCore.Common;
using Bansi.EntityFrameworkCore;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase para el modelado de la vista
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 20/12/2024
    public class vwSolicitudModificacionQueries
    {
        #region Constantes

        private const int CAMBIO_CUENTA = 1;
        private const int CAMBIO_LINEA = 2;

        #endregion Constantes

        #region Public methods

        /// <summary>
        /// Consulta de solicitudes
        /// </summary>
        /// <param name="idStatus"></param>
        /// <param name="numeroCredito"></param>
        /// <param name="fechaInicio"></param>
        /// <param name="fechaFin"></param>
        /// <returns></returns>
        public List<Modelo.DataModels.BdiCred.VwSolicitudModificacion> ConsultarSolicitudesCambioCuentas(int idStatus, int idTipoSolicitud, string numeroCredito, DateTime fechaInicio, DateTime fechaFin)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();
                    
                    if(idStatus > decimal.Zero)
                    {
                        query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudModificacion.IdEstatus), QueryOperator.Equals, idStatus));
                    }

                    if(numeroCredito.IsNotNullOrEmpty())
                    {
                        query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudModificacion.NumeroCredito), QueryOperator.Equals, numeroCredito));
                    }

                    if(fechaInicio.Date > DateTime.MinValue.Date)
                    {
                        query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudModificacion.FechaSolicitud), QueryOperator.GreaterOrEquals, fechaInicio.Date));
                        query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudModificacion.FechaSolicitud), QueryOperator.LessOrEquals, fechaFin.Date));
                    }

                    if (idTipoSolicitud > decimal.Zero)
                    {
                        query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudModificacion.IdTipoSolicitud), QueryOperator.Equals, idTipoSolicitud));
                    }

                    return (query.Count > decimal.Zero) ?
                        bdiCredContext.Execute(x => x.VwSolicitudModificacion.Where(query.ToExpresion<Modelo.DataModels.BdiCred.VwSolicitudModificacion>())).ToList():
                        bdiCredContext.DbContext.VwSolicitudModificacion.AsEnumerable().ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, idStatus);
                throw;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="creditNumber"></param>
        /// <returns></returns>
        public bool ExistsRequestPendingsByCredit(string creditNumber, int tipoSolicitud)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();
                    query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudModificacion.IdEstatus), QueryOperator.Equals, Modelo.Constants.CommonConstants.StatusRequest.ID_PENDIENTE_AUTORIZAR));
                    query.Or(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudModificacion.IdEstatus), QueryOperator.Equals, Modelo.Constants.CommonConstants.StatusRequest.ID_AUTORIZADA));

                    if (tipoSolicitud == CAMBIO_CUENTA)
                    {
                        query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudModificacion.NumeroCredito), QueryOperator.Equals, creditNumber));
                        return bdiCredContext.Execute(
                            x => x.VwSolicitudModificacion.Where(query.ToExpresion<Modelo.DataModels.BdiCred.VwSolicitudModificacion>())).ToList().Count > decimal.Zero;
                    }
                    else
                    {
                        query.And(new Query(nameof(Modelo.DataModels.BdiCred.VwSolicitudCambioLinea.NumeroLinea), QueryOperator.Equals, creditNumber));
                        return bdiCredContext.Execute(
                            x => x.VwSolicitudCambioLinea.Where(query.ToExpresion<Modelo.DataModels.BdiCred.VwSolicitudCambioLinea>())).ToList().Count > decimal.Zero;
                    }
                        
                }
            }
            catch(Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, creditNumber);
                throw;
            }
        }

        #endregion Public methods

    }
}
