namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Clase que describe la respuesta de la consulta de tipo de solicitudes
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class ObtenerTipoSolicitudesResponse : GenericServiceResponse<List<TipoSolicitud>>
    {
        public ObtenerTipoSolicitudesResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new();
        }

        public ObtenerTipoSolicitudesResponse(ReturnCodeInformation<List<TipoSolicitud>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public ObtenerTipoSolicitudesResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new();
        }
    }
}