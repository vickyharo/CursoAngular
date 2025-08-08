namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Class to map response from named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 18/02/2025
    public class LoginServiceApplicationResponse : GenericServiceResponse<LoginInformation>
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public LoginServiceApplicationResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = default;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public LoginServiceApplicationResponse(ReturnCodeInformation<LoginInformation> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public LoginServiceApplicationResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = default;
        }

        #endregion Constructor
    }
}