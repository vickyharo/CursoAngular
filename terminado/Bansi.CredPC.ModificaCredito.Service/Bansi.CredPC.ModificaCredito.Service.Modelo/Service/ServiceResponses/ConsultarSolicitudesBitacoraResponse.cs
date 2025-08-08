namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Clase que describe la respuesta de las solicitudes de bitácora
    /// </summary>
    /// <remarks> Marco Espinoza 21/03/2025</remarks>
    public class ConsultarSolicitudesBitacoraResponse : GenericServiceResponse<List<SolicitudesBitacora>>
    {
        public ConsultarSolicitudesBitacoraResponse(IReturnCodeInformation returnCode) : base(returnCode)
        {
            OperationResultItem = default;
        }

        public ConsultarSolicitudesBitacoraResponse(ReturnCodeInformation<List<SolicitudesBitacora>> returnCode) : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public ConsultarSolicitudesBitacoraResponse(object code, string message) : base(code, message)
        {
            OperationResultItem = default;
        }
    }
}