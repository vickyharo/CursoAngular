namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Class to response to named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 06/02/2024
    public class ConsultarSolicitudesCambioCuentaResponse : GenericServiceResponse<List<SolicitudCambioCuenta>>
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ConsultarSolicitudesCambioCuentaResponse(ReturnCodeInformation<List<SolicitudCambioCuenta>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="ResultItem"></param>
        public ConsultarSolicitudesCambioCuentaResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new List<SolicitudCambioCuenta>();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public ConsultarSolicitudesCambioCuentaResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new List<SolicitudCambioCuenta>();
        }

        #endregion Constructor
    }
}