namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Clase que describe una respuesta para la consulta de información de una línea
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class ConsultarInformacionLineaResponse : GenericServiceResponse<List<Linea>>
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ConsultarInformacionLineaResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = default;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ConsultarInformacionLineaResponse(ReturnCodeInformation<List<Linea>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public ConsultarInformacionLineaResponse(object code, string message)
            : base(code, message)
        {
        }

        #endregion Constructor
    }
}