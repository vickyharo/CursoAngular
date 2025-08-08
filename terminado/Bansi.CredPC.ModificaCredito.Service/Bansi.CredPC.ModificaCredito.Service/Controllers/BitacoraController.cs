using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
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
    public class BitacoraController : ControllerBase
    {
        #region Propiedades

        private readonly IBusinessAccess _businessLogic;

        #endregion Propiedades

        #region Constructor

        public BitacoraController(IBusinessAccess businessLogic)
        {
            _businessLogic = businessLogic;
        }

        #endregion Constructor

        #region Métodos Público

        /// <summary>
        /// Obtiene las columnas de los reportes
        /// </summary>
        /// <param name="request"></param>
        /// <returns>ColumnasReporte</returns>
        /// <remarks>Marco Espinoza 11/04/2025</remarks>
        [AllowAnonymous]
        [HttpPost(nameof(ObtenerColumnasReportes))]
        public ObtenerColumnasReportesResponse ObtenerColumnasReportes([FromBody] ObtenerColumnasReportesRequest request)
        {
            try
            {
                return new ObtenerColumnasReportesResponse(_businessLogic.ObtenerColumnasReportes(request.IdTipoReporte));
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica =
                        CredPCBitacoraHelper.GenerarBitacoraTecnica("USUARIO_GENERICO_CREDPC", "ERROR EN LA CONSULTA DE REPORTE OBTENCIÓN DE COLUMNAS DEL REPORTE.");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        #endregion Métodos Público
    }
}