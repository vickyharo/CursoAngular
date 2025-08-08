using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Service;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses;
using Bansi.CredPC.ModificaCredito.Service.Negocio.Helpers;
using Bansi.CredPC.ModificaCredito.Service.Helpers;
using Bansi.CredPC.Bitacora;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Bansi.CredPC.ModificaCredito.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModificacionLineaController : ControllerBase
    {
        #region Propiedades

        private readonly IBusinessAccess _businessLogic;

        #endregion Propiedades

        #region Constructor

        public ModificacionLineaController(IBusinessAccess businessLogic)
        {
            _businessLogic = businessLogic;
        }

        #endregion Constructor

        #region Métodos Públicos

        /// <summary>
        /// Consulta la información de una línea
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(ConsultarInformacionLinea))]
        public ConsultarInformacionLineaResponse ConsultarInformacionLinea([FromBody] ConsultarInformacionLineaRequest request)
        {
            try
            {
                return new ConsultarInformacionLineaResponse(_businessLogic.ConsultarInformacionLinea(request.NumeroLinea));
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                 CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE INFORMACIÓN DE LA LÍNEA DE CRÉDITO.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Consulta las solicitudes de cambio de linea
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="ReturnCodeException"></exception>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(ConsultarSolicitudesCambioLinea))]
        public ConsultarSolicitudesCambioLineaResponse ConsultarSolicitudesCambioLinea([FromBody] ConsultarSolicitudesCambioLineaRequest request)
        {
            try
            {
                ReturnCodeInformation<List<SolicitudCambioLinea>> returnCode = _businessLogic.ConsultarSolicitudesCambioLinea(
                    request.IdEstatus,
                    request.NumeroLinea.ValueOrEmpty(),
                    request.FechaRegistroInicio,
                    request.FechaRegistroFin
                );

                if (returnCode.Failure) throw new ReturnCodeException(returnCode);

                return new ConsultarSolicitudesCambioLineaResponse(returnCode);
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                        CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC",
                                                                   "ERROR EN LA CONSULTA DE SOLICITUDES DE CAMBIO DE MONTO DE LA LÍNEA DE CRÉDITO.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Registra las soliciudes de cambio de línea
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(RegistrarSolicitudCambioLinea))]
        public RegistrarSolicitudResponse RegistrarSolicitudCambioLinea([FromBody] RegistrarSolicitudRequest request)
        {
            try
            {
                // registra la solicitud
                RegistrarSolicitudResponse result = new RegistrarSolicitudResponse(_businessLogic.RegistrarSolicitudCambioLinea(request));
                //guarda la bitacora de credpc
                string concepto = string.Format("REGISTRO DE SOLICITUD DE CAMBIO DE MONTO DE LINEA REALIZADO CORRECTAMENTE");
                BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.UsuarioSolicita, concepto, true);
                BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.UsuarioSolicita, concepto);
                GuardarBitacoraCred.GuardarBitacoraOperativa(bitacoraOperativa, bitacoraTecnica);
                // devuelve resultado
                return result;
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                       CredPCBitacoraHelper.GenerarBitacoraTecnica(request.UsuarioSolicita, "ERROR EN EL REGISTRO DE SOLICITUDES DE CAMBIO DE MONTO DE LA LÍNEA DE CRÉDITO.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Cancela las solicitudes de cambio de línea
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(CancelarSolicitudCambioLinea))]
        public GenericServiceResponse<bool> CancelarSolicitudCambioLinea([FromBody] ProcesarSolicitudRequest request)
        {
            try
            {
                ReturnCodeInformation returnCode = _businessLogic.CancelarSolicitudCambioLinea(request);
                if (ReturnCodeInformation.IsSuccess(returnCode.Code))
                {
                    //guarda la bitacora de credpc
                    string concepto = string.Format("CANCELACIÓN DE SOLICITUD DE CAMBIO DE MONTO DE LINEA REALIZADO CORRECTAMENTE");
                    BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.Usuario, concepto, true);
                    BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, concepto);
                    GuardarBitacoraCred.GuardarBitacoraOperativa(bitacoraOperativa, bitacoraTecnica);
                }
                return new GenericServiceResponse<bool>(returnCode)
                {
                    OperationResultItem = ReturnCodeInformation.IsSuccess(returnCode.Code),
                };
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica
                    (request.Usuario, "ERROR EN LA CANCELACIÓN DE SOLICITUDES DE CAMBIO DE MONTO DE LA LÍNEA DE CRÉDITO.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Autoriza la solicitud de cambio de línea
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(AutorizarSolicitudCambioLinea))]
        public GenericServiceResponse<bool> AutorizarSolicitudCambioLinea([FromBody] ProcesarSolicitudRequest request)
        {
            try
            {
                ReturnCodeInformation returnCode = _businessLogic.AutorizarSolicitudCambioLinea(request);
                if (ReturnCodeInformation.IsSuccess(returnCode.Code))
                {
                    //guarda la bitacora de credpc
                    string concepto = string.Format("AUTORIZACIÓN DE SOLICITUD DE CAMBIO DE MONTO DE LINEA REALIZADO CORRECTAMENTE");
                    BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.Usuario, concepto, true);
                    BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, concepto);
                    GuardarBitacoraCred.GuardarBitacoraOperativa(bitacoraOperativa, bitacoraTecnica);
                }
                return new GenericServiceResponse<bool>(returnCode)
                {
                    OperationResultItem = ReturnCodeInformation.IsSuccess(returnCode.Code),
                };
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica
                        (request.Usuario, "ERROR EN LA AUTORIZACIÓN DE SOLICITUDES DE CAMBIO DE MONTO DE LA LÍNEA DE CRÉDITO.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Aplica la solicitud de cambio de línea
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>Victoria Haro 08/07/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(AplicarSolicitudCambioLinea))]
        public GenericServiceResponse<bool> AplicarSolicitudCambioLinea([FromBody] ProcesarSolicitudRequest request)
        {
            try
            {
                ReturnCodeInformation returnCode = _businessLogic.AplicarSolicitudCambioLinea(request);
                if (ReturnCodeInformation.IsSuccess(returnCode.Code))
                {
                    //guarda la bitacora de credpc
                    string concepto = string.Format("APLICACIÓN DE SOLICITUD DE CAMBIO DE MONTO DE LINEA REALIZADO CORRECTAMENTE");
                    BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.Usuario, concepto, true);
                    BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, concepto);
                    GuardarBitacoraCred.GuardarBitacoraOperativa(bitacoraOperativa, bitacoraTecnica);
                }
                return new GenericServiceResponse<bool>(returnCode)
                {
                    OperationResultItem = ReturnCodeInformation.IsSuccess(returnCode.Code),
                };
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica
                        (request.Usuario, "ERROR EN LA APLICACIÓN DE SOLICITUDES DE CAMBIO DE MONTO DE LA LÍNEA DE CRÉDITO.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        #endregion Métodos Públicos
    }
}