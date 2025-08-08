namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Class to response to named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 06/02/2024
    public class ObtenerEstatusSolicitudCambioCuentaResponse : GenericServiceResponse<List<EstatusSolicitudCambioCuenta>>
    {
        #region Constructor

        /// <summary>
        /// DefaultConstructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ObtenerEstatusSolicitudCambioCuentaResponse(ReturnCodeInformation<List<EstatusSolicitudCambioCuenta>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ObtenerEstatusSolicitudCambioCuentaResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public ObtenerEstatusSolicitudCambioCuentaResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new();
        }

        #endregion Constructor
    }
}