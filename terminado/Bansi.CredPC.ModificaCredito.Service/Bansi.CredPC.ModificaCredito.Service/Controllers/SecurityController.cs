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
    public class SecurityController : ControllerBase
    {
        #region Properties

        private readonly IBusinessAccess BusinessLogic;

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="businessLogic"></param>
        public SecurityController(IBusinessAccess businessLogic)
        {
            BusinessLogic = businessLogic;
        }

        #endregion Constructor

        #region ValidarServer

        /// <summary>
        /// Obtiene las fechas y la versión del compilado
        /// </summary>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        [HttpGet(nameof(GetVersionDate))]
        [AllowAnonymous]
        public ObtenerFechaVersionResponse GetVersionDate()
        {
            try
            {
                ReturnCodeInformation<string> version = SecurityHelper.ObtenerVersion();
                if (version.Failure)
                    throw new InvalidOperationException("No se obtuvo la versión del archivo");

                ReturnCodeInformation<Fechas> fechas = BusinessLogic.ObtenerFechasCredPc();
                if (fechas.Failure)
                    throw new InvalidOperationException("No se obtuvo la fecha del sistema " + fechas.Message);

                fechas.ResultItem.Version = version.ResultItem;
                return new ObtenerFechaVersionResponse(fechas);
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica("Usuario Genérico Modificación Créditos", "ERROR AL OBTENER FECHA Y VERSIÓN");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        #endregion ValidarServer
    }
}