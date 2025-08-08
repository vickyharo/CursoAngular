namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Class to describe a response of the named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public class ConsultarInformacionCreditoResponse : GenericServiceResponse<List<CreditoMinistrado>>
    {
        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ConsultarInformacionCreditoResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ConsultarInformacionCreditoResponse(ReturnCodeInformation<List<CreditoMinistrado>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public ConsultarInformacionCreditoResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new();
        }

        #endregion Constructor
    }
}