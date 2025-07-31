namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Generic service response
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// Jorge Alejandro Ruiz Murillo, 05/02/2025
    public class GenericServiceResponse<T> : ReturnCodeInformation
    {
        #region Properties

        public T? OperationResultItem { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public GenericServiceResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = default;
            UserMessage = IsFailure(returnCode.Code) ?
               Constants.CommonConstants.ReturnCodeConsts.USER_ERROR_MESSAGE :
               Constants.CommonConstants.ReturnCodeConsts.USER_SUCCESS_MESSAGE;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public GenericServiceResponse(ReturnCodeInformation<T> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
            UserMessage = IsFailure(returnCode.Code) ?
               Constants.CommonConstants.ReturnCodeConsts.USER_ERROR_MESSAGE :
               Constants.CommonConstants.ReturnCodeConsts.USER_SUCCESS_MESSAGE;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public GenericServiceResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = default;
            UserMessage = IsFailure(code) ?
               Constants.CommonConstants.ReturnCodeConsts.USER_ERROR_MESSAGE :
               Constants.CommonConstants.ReturnCodeConsts.USER_SUCCESS_MESSAGE;
        }

        #endregion Constructor
    }
}