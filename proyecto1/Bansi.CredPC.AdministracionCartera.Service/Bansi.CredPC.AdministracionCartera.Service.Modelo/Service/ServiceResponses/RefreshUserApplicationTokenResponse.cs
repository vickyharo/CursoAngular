namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Class to model the response from named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo,
    public class RefreshUserApplicationTokenResponse : GenericServiceResponse<string>
    {
        #region Constructor

        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="returnCode"></param>
        public RefreshUserApplicationTokenResponse(IReturnCodeInformation returnCode) : base(returnCode)
        {
            OperationResultItem = string.Empty;
        }

        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="returnCode"></param>
        public RefreshUserApplicationTokenResponse(ReturnCodeInformation<string> returnCode) : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public RefreshUserApplicationTokenResponse(object code, string message) : base(code, message)
        {
            OperationResultItem = string.Empty;
        }

        #endregion Constructor
    }
}