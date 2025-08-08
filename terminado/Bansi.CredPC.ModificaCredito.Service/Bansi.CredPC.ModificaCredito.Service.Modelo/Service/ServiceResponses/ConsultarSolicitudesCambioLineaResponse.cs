namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Clase que describe la respuesta de la consulta de solicitudes de cambio de línea
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class ConsultarSolicitudesCambioLineaResponse : GenericServiceResponse<List<SolicitudCambioLinea>>
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ConsultarSolicitudesCambioLineaResponse(ReturnCodeInformation<List<SolicitudCambioLinea>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="ResultItem"></param>
        public ConsultarSolicitudesCambioLineaResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new List<SolicitudCambioLinea>();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public ConsultarSolicitudesCambioLineaResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new List<SolicitudCambioLinea>();
        }

        #endregion Constructor
    }
}