namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Class to describe a response of the named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public class ConsultarInformacionClienteResponse : GenericServiceResponse<Cliente>
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ConsultarInformacionClienteResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = default;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ConsultarInformacionClienteResponse(ReturnCodeInformation<Cliente> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public ConsultarInformacionClienteResponse(object code, string message)
            : base(code, message)
        {
        }

        #endregion Constructor
    }
}