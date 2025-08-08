using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Service;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses;
using Bansi.CredPC.ModificaCredito.Service.Negocio.Helpers;
using Bansi.CredPC.ModificaCredito.Service.Helpers;
using Bansi.CredPC.Bitacora;
using Microsoft.AspNetCore.Mvc;
using static Bansi.CredPC.ModificaCredito.Service.Constants.CommonConstants;
using Microsoft.AspNetCore.Authorization;

namespace Bansi.CredPC.ModificaCredito.Service.Controllers
{
    /// <summary>
    /// Endpoint class
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    [Route("api/[controller]")]
    [ApiController]
    public class ModificacionCuentaController : ControllerBase
    {
        #region Properties

        private readonly IBusinessAccess BusinessLogic;

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="businessLogic"></param>
        public ModificacionCuentaController(IBusinessAccess businessLogic)
        {
            BusinessLogic = businessLogic;
        }

        #endregion Constructor

        #region Public Methods

        /// <summary>
        /// Method to get account change requests
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="ReturnCodeException"></exception>
        [AllowAnonymous]
        [HttpPost(nameof(ConsultarSolicitudesCambioCuenta))]
        public ConsultarSolicitudesCambioCuentaResponse ConsultarSolicitudesCambioCuenta([FromBody] ConsultarSolicitudesCambioCuentaRequest request)
        {
            try
            {
                ReturnCodeInformation<List<SolicitudCambioCuenta>> returnCode = BusinessLogic.ConsultarsolicitudesCambioCuenta(
                    request.IdStatus,
                    TipoSolicitudConst.SOLICITUD_CAMBIO_CUENTA,
                    request.NumeroCredito.ValueOrEmpty(),
                    request.FechaInicio,
                    request.FechaFin
                );

                if (returnCode.Failure) throw new ReturnCodeException(returnCode);

                return new ConsultarSolicitudesCambioCuentaResponse(returnCode);
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                    CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE SOLICITUD DE CAMBIO DE CUENTA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);

                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Metohod to register account change request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost(nameof(RegistrarSolicitudCambioCuenta))]
        public RegistrarSolicitudResponse RegistrarSolicitudCambioCuenta([FromBody] RegistrarSolicitudRequest request)
        {
            try
            {
                // registra la solicitud
                RegistrarSolicitudResponse result = new RegistrarSolicitudResponse(BusinessLogic.RegistrarSolicitudCambioCuenta(request));
                //guarda la bitacora de credpc
                string concepto = string.Format("REGISTRO DE SOLICITUD DE CAMBIO DE CUENTA REALIZADO CORRECTAMENTE");
                BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.UsuarioSolicita, concepto, true);
                BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.UsuarioSolicita, concepto);
                GuardarBitacoraCred.GuardarBitacoraOperativa(bitacoraOperativa, bitacoraTecnica);
                // devuelve resultado
                return result;
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                    CredPCBitacoraHelper.GenerarBitacoraTecnica(request.UsuarioSolicita, "ERROR EN EL REGISTRO DE CAMBIO DE CUENTA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);

                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Method to cancel account change request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost(nameof(CancelarSolicitudCambioCuenta))]
        public GenericServiceResponse<bool> CancelarSolicitudCambioCuenta([FromBody] ProcesarSolicitudRequest request)
        {
            try
            {
                ReturnCodeInformation returnCode = BusinessLogic.CancelarSolicitudCambioCuenta(request);

                if (ReturnCodeInformation.IsSuccess(returnCode.Code))
                {
                    //guarda la bitacora de credpc
                    string concepto = string.Format("CANCELACIÓN DE SOLICITUD DE CAMBIO DE CUENTA REALIZADO CORRECTAMENTE");
                    BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.Usuario, concepto, true);
                    BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, concepto);
                    GuardarBitacoraCred.GuardarBitacoraOperativa(bitacoraOperativa, bitacoraTecnica);
                }

                return new GenericServiceResponse<bool>(returnCode)
                {
                    OperationResultItem = ReturnCodeInformation.IsSuccess(returnCode.Code)
                };
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                     CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, "ERROR EN LA CANCELACION DE SOLICITUD DE CAMBIO DE CUENTA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Authorizes a account change re request
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost(nameof(AutorizarSolicitudCambioCuenta))]
        public GenericServiceResponse<bool> AutorizarSolicitudCambioCuenta([FromBody] ProcesarSolicitudRequest request)
        {
            try
            {
                ReturnCodeInformation returnCode = BusinessLogic.AutorizarSolicitudCambioCuenta(request);

                if (ReturnCodeInformation.IsSuccess(returnCode.Code))
                {
                    //guarda la bitacora de credpc
                    string concepto = string.Format("AUTORIZACIÓN DE SOLICITUD DE CAMBIO DE CUENTA REALIZADO CORRECTAMENTE");
                    BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.Usuario, concepto, true);
                    BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, concepto);
                    GuardarBitacoraCred.GuardarBitacoraOperativa(bitacoraOperativa, bitacoraTecnica);
                }

                return new GenericServiceResponse<bool>(returnCode)
                {
                    OperationResultItem = ReturnCodeInformation.IsSuccess(returnCode.Code)
                };
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                    CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, "ERROR EN LA AUTORIZACIÓN DE SOLICITUD DE CAMBIO DE CUENTA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Aplica una autorizacion para el cambio de cuenta
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost(nameof(AplicarSolicitudCambioCuenta))]
        public GenericServiceResponse<bool> AplicarSolicitudCambioCuenta([FromBody] ProcesarSolicitudRequest request)
        {
            try
            {
                ReturnCodeInformation returnCode = BusinessLogic.AplicarSolicitudCambioCuenta(request);

                if (ReturnCodeInformation.IsSuccess(returnCode.Code))
                {
                    //guarda la bitacora de credpc
                    string concepto = string.Format("APLICACIÓN DE SOLICITUD DE CAMBIO DE CUENTA REALIZADO CORRECTAMENTE");
                    BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.Usuario, concepto, true);
                    BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, concepto);
                    GuardarBitacoraCred.GuardarBitacoraOperativa(bitacoraOperativa, bitacoraTecnica);
                }

                return new GenericServiceResponse<bool>(returnCode)
                {
                    OperationResultItem = ReturnCodeInformation.IsSuccess(returnCode.Code)
                };
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                    CredPCBitacoraHelper.GenerarBitacoraTecnica(request.Usuario, "ERROR EN LA APLICACIÓN DE SOLICITUD DE CAMBIO DE CUENTA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Gets available status of account change requests catalogue
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet(nameof(ObtenerEstatusSolicitudCambioCuenta))]
        public ObtenerEstatusSolicitudCambioCuentaResponse ObtenerEstatusSolicitudCambioCuenta()
        {
            try
            {
                return new ObtenerEstatusSolicitudCambioCuentaResponse(BusinessLogic.ObtenerEstatusSolicitudCambioCuenta());
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE ESTATUS DE SOLICITUD DE CAMBIO DE CUENTA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Gets natures
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet(nameof(ObtenerNaturalezas))]
        public ObtenerNaturalezasResponse ObtenerNaturalezas()
        {
            try
            {
                return new ObtenerNaturalezasResponse(BusinessLogic.ObtenerNaturalezas());
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE NATURALEZAS");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Method to get account types
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet(nameof(ObtenerTiposCuentas))]
        public ObtenerTiposCuentasResponse ObtenerTiposCuentas()
        {
            try
            {
                return new ObtenerTiposCuentasResponse(BusinessLogic.ObtenerTiposCuentas());
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE TIPOS DE CUENTA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Method to get credit information
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost(nameof(ConsultarInformacionCredito))]
        public ConsultarInformacionCreditoResponse ConsultarInformacionCredito([FromBody] ConsultarInformacionCreditoRequest request)
        {
            try
            {
                ConsultarInformacionCreditoResponse creditInformation = new ConsultarInformacionCreditoResponse(BusinessLogic.ConsultarInformacionCredito(request.NumeroCredito));

                return creditInformation;
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE INFORMACIÓN DEL CRÉDITO");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Gets credit accounts
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost(nameof(ConsultarCuentasAsociadasCredito))]
        public ConsultarCuentasAsociadasCreditoResponse ConsultarCuentasAsociadasCredito([FromBody] ConsultarCuentasAsociadasCreditoRequest request)
        {
            try
            {
                return new ConsultarCuentasAsociadasCreditoResponse(BusinessLogic.ConsultarCuentasCredito(request.NumeroCredito));
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
            CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE CUENTAS ASOCIADAS AL CRÉDITO");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Gets customer information
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost(nameof(ConsultarInformacionCliente))]
        public ConsultarInformacionClienteResponse ConsultarInformacionCliente([FromBody] ConsultarInformacionClienteRequest request)
        {
            try
            {
                return new ConsultarInformacionClienteResponse(BusinessLogic.ConsultarInformacionCliente(request.NumeroCliente));
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE INFORMACIÓN DEL CLIENTE");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Gets account information
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost(nameof(ConsultarInformacionCuenta))]
        public ConsultarInformacionCuentaResponse ConsultarInformacionCuenta([FromBody] ConsultarInformacionCuentaRequest request)
        {
            try
            {
                return new ConsultarInformacionCuentaResponse(BusinessLogic.ConsultarInformacionCuenta(request.NumeroCuenta));
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                    CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE INFORMACIÓN DE CUENTA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Validar si una cuenta permite un abono
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>Victoria Haro 16/07/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(ValidarCuentaPermiteAbono))]
        public GenericServiceResponse<bool> ValidarCuentaPermiteAbono([FromBody] ValidarCuentaPermiteAbonoRequest request)
        {
            try
            {
                ReturnCodeInformation returnCode = BusinessLogic.ValidarCuentaPermiteAbono(request);
                if (ReturnCodeInformation.IsSuccess(returnCode.Code))
                {
                    //guarda la bitacora de credpc
                    string concepto = string.Format("VALIDACIÓN DE UNA CUENTA SI PERMITE ABONO REALIZADO CORRECTAMENTE");
                    BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.NumeroCuenta, concepto, true);
                    BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.NumeroCuenta, concepto);
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
                        (request.NumeroCuenta, "ERROR EN LA VALIDACIÓN DE UNA CUENTA SI PERMITE ABONO.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Validar si una cuenta permite un cargo
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <remarks>Victoria Haro 16/07/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(ValidarCuentaPermiteCargo))]
        public GenericServiceResponse<bool> ValidarCuentaPermiteCargo([FromBody] ValidarCuentaPermiteCargoRequest request)
        {
            try
            {
                ReturnCodeInformation returnCode = BusinessLogic.ValidarCuentaPermiteCargo(request);
                if (ReturnCodeInformation.IsSuccess(returnCode.Code))
                {
                    //guarda la bitacora de credpc
                    string concepto = string.Format("VALIDACIÓN DE UNA CUENTA SI PERMITE CARGO REALIZADO CORRECTAMENTE");
                    BitacoraOperativa bitacoraOperativa = CredPCBitacoraHelper.GenerarBitacoraOperativa(request.NumeroCuenta, concepto, true);
                    BitacoraTecnica bitacoraTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.NumeroCuenta, concepto);
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
                        (request.NumeroCuenta, "ERROR EN LA VALIDACIÓN DE UNA CUENTA SI PERMITE CARGO.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex, request);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        #endregion Public Methods
    }
}