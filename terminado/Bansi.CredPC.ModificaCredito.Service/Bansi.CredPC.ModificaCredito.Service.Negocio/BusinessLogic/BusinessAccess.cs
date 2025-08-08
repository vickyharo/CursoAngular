using Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase;
using Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Service;
using Bansi.CredPC.ModificaCredito.Service.Negocio.Helpers;
using static Bansi.CredPC.ModificaCredito.Service.Negocio.Constants.CommonConstants;

namespace Bansi.CredPC.ModificaCredito.Service.Negocio.BusinessLogic
{
    /// <summary>
    /// Clase para el acceos a el negocio de la libreria
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/06/2024
    public class BusinessAccess : IBusinessAccess
    {
        #region ModificacionCuenta

        /// <summary>
        /// Consulta de solicitudes
        /// </summary>
        /// <param name="idEstatus"></param>
        /// <param name="numeroCredito"></param>
        /// <param name="fechaInicio"></param>
        /// <param name="fechaFin"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<SolicitudCambioCuenta>> ConsultarsolicitudesCambioCuenta(int idEstatus, int idTipoSolicitud, string numeroCredito, DateTime fechaInicio, DateTime fechaFin)
        {
            try
            {
                List<VwSolicitudModificacion> solicitudes = new vwSolicitudModificacionQueries().ConsultarSolicitudesCambioCuentas
                    (
                        idEstatus,
                        idTipoSolicitud,
                        numeroCredito,
                        fechaInicio,
                        fechaFin
                    );

                ReturnCodeInformation<List<SolicitudCambioCuenta>> returnCode = ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(ObjectConverterHelper.CastObjectTo<List<SolicitudCambioCuenta>>(solicitudes));

                vwDetalleSolicitudCambioCuentaQueries vwDetalle = new();

                returnCode.ResultItem.ForEach(x => x.DetalleSolicitud = ObjectConverterHelper.CastObjectTo<List<DetalleSolicitudCambioCuenta>>(vwDetalle.ConsultarDetalleSolicitud(x.IdSolicitud)));

                return returnCode;
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, idEstatus, numeroCredito, fechaInicio, fechaFin);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<SolicitudCambioCuenta>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<SolicitudCambioCuenta>>(ex.Message);
            }
        }

        /// <summary>
        /// Metodo para el registro de solicitud de cambio de cuenta
        /// </summary>
        /// <param name="reqSolcitud"></param>
        /// <returns></returns>
        public ReturnCodeInformation<int> RegistrarSolicitudCambioCuenta(Modelo.Service.ServiceRequests.RegistrarSolicitudRequest reqSolcitud)
        {
            try
            {
                using (System.Transactions.TransactionScope scope = new System.Transactions.TransactionScope())
                {
                    var solicitud = new BDICredQueries().spRegistroSolicitudModificacion
                                (
                                    reqSolcitud.NumeroCredito.ValueOrEmpty(),
                                    TipoSolicitudConst.SOLICITUD_CAMBIO_CUENTA,
                                    reqSolcitud.UsuarioSolicita.ValueOrEmpty(),
                                    reqSolcitud.IdStatusSolicitud,
                                    reqSolcitud.Comentario.ValueOrEmpty()
                                );

                    reqSolcitud.DetalleSolicitud.ForEach(detalle =>
                    {
                        _ = new BDICredQueries().spRegistroDetalleCambioCuenta(
                        solicitud.ResultItem,
                        detalle.Clavenaturaleza,
                        detalle.Clavetipocuenta,
                        detalle.Cuentaoriginal,
                        detalle.Cuentanueva);
                    });

                    scope.Complete();
                    return solicitud;
                }
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqSolcitud);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<int>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<int>(ex.Message);
            }
        }

        /// <summary>
        /// Realiza la cancelacion de una solicitud
        /// </summary>
        /// <param name="reqCancelacion"></param>
        /// <returns></returns>
        public ReturnCodeInformation CancelarSolicitudCambioCuenta(Modelo.Service.ServiceRequests.ProcesarSolicitudRequest reqCancelacion)
        {
            try
            {
                return new BDICredQueries().spCancelarSolicitudCambioCuenta(
                    reqCancelacion.IdSolicitud,
                    reqCancelacion.Usuario,
                    reqCancelacion.Comentario
                );
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqCancelacion);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message);
            }
        }

        /// <summary>
        /// Realiza la autorizacion de una solicitud
        /// </summary>
        /// <param name="reqAutorizacion"></param>
        /// <returns></returns>
        public ReturnCodeInformation AutorizarSolicitudCambioCuenta(Modelo.Service.ServiceRequests.ProcesarSolicitudRequest reqAutorizacion)
        {
            try
            {
                return new BDICredQueries().spAutorizarSolicitudCambioCuenta(
                    reqAutorizacion.IdSolicitud,
                    reqAutorizacion.Usuario,
                    reqAutorizacion.Comentario
                );
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqAutorizacion);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message);
            }
        }

        /// <summary>
        /// Realiza la autorizacion de una solicitud
        /// </summary>
        /// <param name="reqAplicacion"></param>
        /// <returns></returns>
        public ReturnCodeInformation AplicarSolicitudCambioCuenta(Modelo.Service.ServiceRequests.ProcesarSolicitudRequest reqAplicacion)
        {
            try
            {
                return new BDICredQueries().spAplicarSolicitudCambioCuenta(
                    reqAplicacion.IdSolicitud,
                    reqAplicacion.Usuario,
                    reqAplicacion.Comentario
                );
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqAplicacion);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message);
            }
        }

        /// <summary>
        /// Obtiene los estatus de solicitud de cambio de cuenta
        /// </summary>
        /// <returns></returns>
        public ReturnCodeInformation<List<EstatusSolicitudCambioCuenta>> ObtenerEstatusSolicitudCambioCuenta()
        {
            try
            {
                return ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(ObjectConverterHelper.CastObjectTo<List<EstatusSolicitudCambioCuenta>>(
                    new tblEstatusSolicitudCambioCuentaQueries().ObtenerEstatusSolicitudCambioCuenta()
                ));
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<EstatusSolicitudCambioCuenta>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<EstatusSolicitudCambioCuenta>>(ex.Message);
            }
        }

        /// <summary>
        /// Obtiene las naturalezas
        /// </summary>
        /// <returns></returns>
        public ReturnCodeInformation<List<Naturaleza>> ObtenerNaturalezas()
        {
            try
            {
                return ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(ObjectConverterHelper.CastObjectTo<List<Naturaleza>>(
                    new tblCatalogoNaturalezaQueries().ObtenerNaturalezas()
                ));
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<Naturaleza>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<Naturaleza>>(ex.Message);
            }
        }

        /// <summary>
        /// Obtiene los tipos de cuentas
        /// </summary>
        /// <returns></returns>
        public ReturnCodeInformation<List<TipoCuenta>> ObtenerTiposCuentas()
        {
            try
            {
                return ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(ObjectConverterHelper.CastObjectTo<List<TipoCuenta>>(
                    new tblTipoCuentaQueries().ObtenerTiposCuenta()
                ));
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<TipoCuenta>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<TipoCuenta>>(ex.Message);
            }
        }

        /// <summary>
        /// Consulta de Creditos
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<CreditoMinistrado>> ConsultarInformacionCredito(string numeroCredito)
        {
            try
            {
                List<Vwcreditosministrados> listaCreditos = new vwCreditosMinistradosQueries().ConsultarCreditos(numeroCredito);

                ReturnCodeInformation<List<CreditoMinistrado>> returnCode =
                    ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(ObjectConverterHelper.CastObjectTo<List<CreditoMinistrado>>(listaCreditos));

                if (returnCode.Success)
                    if (returnCode.ResultItem.Any())
                        returnCode.ResultItem.ForEach(x => x.ExistenSolicitudesPendientesAutorizar =
                            ExistenSolicitudesPendientesAutorizar(x.NumeroCredito, TipoSolicitudConst.SOLICITUD_CAMBIO_CUENTA));

                return returnCode;
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, numeroCredito);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<CreditoMinistrado>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<CreditoMinistrado>>(ex.Message);
            }
        }

        /// <summary>
        /// Consulta de cuentas de creditos
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<CuentaAsociadaCredito>> ConsultarCuentasCredito(string numeroCredito)
        {
            try
            {
                return ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(ObjectConverterHelper.CastObjectTo<List<CuentaAsociadaCredito>>
                (
                    new vwCuentasAsociadasCreditoQueries().ConsultarCuentasCredito(numeroCredito)
                ));
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, numeroCredito);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<CuentaAsociadaCredito>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<CuentaAsociadaCredito>>(ex.Message);
            }
        }

        /// <summary>
        /// Gets Cliente information
        /// </summary>
        /// <param name="numeroCliente"></param>
        /// <returns></returns>
        public ReturnCodeInformation<Cliente> ConsultarInformacionCliente(string numeroCliente)
        {
            try
            {
                return new BDICredQueries().spConsultarInformacionCliente(numeroCliente);
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, numeroCliente);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<Cliente>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<Cliente>(ex.Message);
            }
        }

        /// <summary>
        /// Gets account information
        /// </summary>
        /// <param name="numeroCuenta"></param>
        /// <returns></returns>
        public ReturnCodeInformation<Cuenta> ConsultarInformacionCuenta(string numeroCuenta)
        {
            try
            {
                return new BDICredQueries().spConsultarInformacionCuenta(numeroCuenta);
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, numeroCuenta);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<Cuenta>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<Cuenta>(ex.Message);
            }
        }

        /// <summary>
        /// Check if exists any request pending by credit
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <returns></returns>
        public bool ExistenSolicitudesPendientesAutorizar(string numeroCredito, int idTipoSolicitud)
        {
            try
            {
                return new vwSolicitudModificacionQueries().ExistsRequestPendingsByCredit(numeroCredito, idTipoSolicitud);
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, numeroCredito);
                throw;
            }
        }

        #endregion ModificacionCuenta

        #region ModificacionLinea

        /// <summary>
        /// Consulta la información de una línea
        /// </summary>
        /// <param name="numeroLinea"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public ReturnCodeInformation<List<Linea>> ConsultarInformacionLinea(string numeroLinea)
        {
            try
            {
                ReturnCodeInformation<List<Linea>> returnCode = new BDICredQueries().spConsultarInformacionLinea(numeroLinea);

                if (returnCode.Success)
                    if (returnCode.ResultItem.Any())
                        returnCode.ResultItem.ForEach(soli => soli.ExistenSolicitudesPendientesAutorizar =
                        ExistenSolicitudesPendientesAutorizar(soli.NumeroLinea, TipoSolicitudConst.SOLICITUD_CAMBIO_LINEA));

                return returnCode;
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, numeroLinea);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<Linea>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<Linea>>(ex.Message);
            }
        }

        /// <summary>
        /// Método para la consulta de solicitudes de cambio de línea
        /// </summary>
        /// <param name="idEstatus"></param>
        /// <param name="numeroLinea"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public ReturnCodeInformation<List<SolicitudCambioLinea>> ConsultarSolicitudesCambioLinea(int idEstatus, string numeroLinea, DateTime _fechaRegistroInicio, DateTime _fechaRegistroFin)
        {
            try
            {
                List<VwSolicitudCambioLinea> solicitudes = new vwSolicitudCambioLineaQueries().ConsultarSolicitudesCambioLinea(
                    idEstatus,
                    numeroLinea,
                    _fechaRegistroInicio,
                    _fechaRegistroFin
                );

                ReturnCodeInformation<List<SolicitudCambioLinea>> returnCode =
                    ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode
                    (ObjectConverterHelper.CastObjectTo<List<SolicitudCambioLinea>>(solicitudes));

                vwDetalleSolicitudCambioLineaQueries vwDetalle = new();

                returnCode.ResultItem.ForEach(x => x.DetalleSolicitudCambioLinea =
                ObjectConverterHelper.CastObjectTo<DetalleSolicitudCambioLinea>(vwDetalle.ConsultarDetalleSolicitudLinea(x.IdSolicitud)));

                return returnCode;
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, idEstatus, numeroLinea);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<SolicitudCambioLinea>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<SolicitudCambioLinea>>(ex.Message);
            }
        }

        /// <summary>
        /// Registra una solicitud para el cambio de línea
        /// </summary>
        /// <param name="reqSolcitud"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public ReturnCodeInformation<int> RegistrarSolicitudCambioLinea(Modelo.Service.ServiceRequests.RegistrarSolicitudRequest reqSolcitud)
        {
            try
            {
                var montoValido = new BDICredQueries().spValidarCambioMontoLinea(reqSolcitud.NumeroCredito, reqSolcitud.DetalleSolicitudCambioLinea.MontoNuevo);

                if (montoValido.Success)
                {
                    using (System.Transactions.TransactionScope scope = new System.Transactions.TransactionScope())
                    {
                        var solicitud = new BDICredQueries().spRegistroSolicitudModificacion
                                    (
                                        reqSolcitud.NumeroCredito.ValueOrEmpty(),
                                        TipoSolicitudConst.SOLICITUD_CAMBIO_LINEA,
                                        reqSolcitud.UsuarioSolicita.ValueOrEmpty(),
                                        reqSolcitud.IdStatusSolicitud,
                                        reqSolcitud.Comentario.ValueOrEmpty()
                                    );

                        _ = new BDICredQueries().spRegistroDetalleCambioLinea(
                            solicitud.ResultItem,
                            reqSolcitud.DetalleSolicitudCambioLinea.MontoOriginal,
                            reqSolcitud.DetalleSolicitudCambioLinea.MontoNuevo
                        );

                        scope.Complete();
                        return solicitud;
                    }
                }
                else
                {
                    return new ReturnCodeInformation<int>(montoValido.Code, montoValido.Message, 0);
                }
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqSolcitud);

                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<int>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<int>(ex.Message);
            }
        }

        /// <summary>
        /// Cancela solicitud del cambio de línea
        /// </summary>
        /// <param name="reqCancelacion"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        public ReturnCodeInformation CancelarSolicitudCambioLinea(Modelo.Service.ServiceRequests.ProcesarSolicitudRequest reqCancelacion)
        {
            try
            {
                return new BDICredQueries().spCancelarSolicitudCambioCuenta(
                    reqCancelacion.IdSolicitud,
                    reqCancelacion.Usuario,
                    reqCancelacion.Comentario
                );
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqCancelacion);

                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Autoriza solicitud del cambio de línea
        /// </summary>
        /// <param name="reqAutorizacion"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        public ReturnCodeInformation AutorizarSolicitudCambioLinea(Modelo.Service.ServiceRequests.ProcesarSolicitudRequest reqAutorizacion)
        {
            try
            {
                return new BDICredQueries().spAutorizarSolicitudCambioCuenta(
                    reqAutorizacion.IdSolicitud,
                    reqAutorizacion.Usuario,
                    reqAutorizacion.Comentario
                );
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqAutorizacion);

                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        public ReturnCodeInformation AplicarSolicitudCambioLinea(Modelo.Service.ServiceRequests.ProcesarSolicitudRequest reqAplicacion)
        {
            try
            {
                return new BDICredQueries().spAplicarSolicitudCambioCuenta(
                    reqAplicacion.IdSolicitud,
                    reqAplicacion.Usuario,
                    reqAplicacion.Comentario
                );
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqAplicacion);

                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        public ReturnCodeInformation ValidarCuentaPermiteAbono(Modelo.Service.ServiceRequests.ValidarCuentaPermiteAbonoRequest reqValidacion)
        {
            try
            {
                return new BDICredQueries().fnCuentaPermiteTransaccionesAbono(
                    reqValidacion.NumeroCuenta
                );
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqValidacion);

                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        public ReturnCodeInformation ValidarCuentaPermiteCargo(Modelo.Service.ServiceRequests.ValidarCuentaPermiteCargoRequest reqValidacion)
        {
            try
            {
                return new BDICredQueries().fnCuentaPermiteTransaccionesCargo(
                    reqValidacion.NumeroCuenta,
                    reqValidacion.NumeroCredito,
                    reqValidacion.Producto
                );
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex, reqValidacion);

                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        #endregion ModificacionLinea

        #region ConsBitacora

        /// <summary>
        /// Obitiene las columnas de los reportes
        /// </summary>
        /// <param name="idTipoSolicitud"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<ReporteDetalleColumnas>> ObtenerColumnasReportes(int idTipoSolicitud)
        {
            try
            {
                return ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(
                    ObjectConverterHelper.CastObjectTo<List<ReporteDetalleColumnas>>(new tblReporteDetalleColumnasQueries().ObtenerColumnasReportes(idTipoSolicitud)));
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);

                return (ex is ReturnCodeException rcex) ?
                    new ReturnCodeInformation<List<ReporteDetalleColumnas>>(rcex.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<ReporteDetalleColumnas>>(ex.Message);
            }
        }

        #endregion ConsBitacora

        #region Security

        /// <summary>
        /// Obtiene las fechas de CREDPC
        /// </summary>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        public ReturnCodeInformation<Fechas> ObtenerFechasCredPc()
        {
            try
            {
                return new BDICredQueries().spObtenFechasCredPC();
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);

                return (ex is ReturnCodeException rcex) ?
                    new ReturnCodeInformation<Fechas>(rcex.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<Fechas>(ex.Message);
            }
        }

        #endregion Security
    }
}