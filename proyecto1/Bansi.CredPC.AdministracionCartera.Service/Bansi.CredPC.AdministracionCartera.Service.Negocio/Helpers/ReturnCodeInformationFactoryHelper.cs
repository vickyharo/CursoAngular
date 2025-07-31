namespace Bansi.CredPC.AdministracionCartera.Service.Negocio.Helpers
{
    /// <summary>
    /// Class to generate ReturnCodeInformations
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 18/02/2025
    public static class ReturnCodeInformationFactoryHelper
    {
        #region Public methods

        /// <summary>
        /// Generates a Error ReturnCodeInformation
        /// </summary>
        /// <param name="errorMessage"></param>
        /// <returns></returns>
        public static ReturnCodeInformation GenerateGenericErrorReturnCode(string errorMessage = "")
        {
            errorMessage = StringHelper.IsNullOrEmpty(errorMessage) ?
                Modelo.Constants.CommonConstants.ReturnCodeConsts.ERROR_MESSAGE :
                errorMessage;

            return new ReturnCodeInformation()
            {
                Code = Modelo.Constants.CommonConstants.ReturnCodeConsts.GENERIC_ERROR_CODE.ToString(),
                Message = errorMessage,
                UserMessage = Modelo.Constants.CommonConstants.ReturnCodeConsts.USER_ERROR_MESSAGE
            };
        }

        /// <summary>
        /// Generates a Success ReturnCodeInformation
        /// </summary>
        /// <returns></returns>
        public static ReturnCodeInformation GenerateGenericSuccessReturnCode()
        {
            return new ReturnCodeInformation()
            {
                Code = Modelo.Constants.CommonConstants.ReturnCodeConsts.SUCCESS_CODE.ToString(),
                Message = Modelo.Constants.CommonConstants.ReturnCodeConsts.SUCCESS_MESSAGE,
                UserMessage = Modelo.Constants.CommonConstants.ReturnCodeConsts.USER_SUCCESS_MESSAGE
            };
        }

        /// <summary>
        /// Generates a typed Error ReturnCodeInformation
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="resultItem"></param>
        /// <param name="errorMessage"></param>
        /// <returns></returns>
        public static ReturnCodeInformation<T> GenerateGenericErrorReturnCode<T>(T resultItem, string errorMessage = "")
        {
            errorMessage = StringHelper.IsNullOrEmpty(errorMessage) ?
                Modelo.Constants.CommonConstants.ReturnCodeConsts.ERROR_MESSAGE :
                errorMessage;

            return new ReturnCodeInformation<T>()
            {
                Code = Modelo.Constants.CommonConstants.ReturnCodeConsts.GENERIC_ERROR_CODE.ToString(),
                Message = errorMessage,
                UserMessage = Modelo.Constants.CommonConstants.ReturnCodeConsts.USER_ERROR_MESSAGE,
                ResultItem = resultItem
            };
        }

        /// <summary>
        /// Generates a typed Error ReturnCodeInformation
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="errorMessage"></param>
        /// <returns></returns>
        public static ReturnCodeInformation<T> GenerateGenericErrorReturnCode<T>(string errorMessage)
        {
            errorMessage = StringHelper.IsNullOrEmpty(errorMessage) ?
                Modelo.Constants.CommonConstants.ReturnCodeConsts.ERROR_MESSAGE :
                errorMessage;

            return new ReturnCodeInformation<T>()
            {
                Code = Modelo.Constants.CommonConstants.ReturnCodeConsts.GENERIC_ERROR_CODE.ToString(),
                Message = errorMessage,
                UserMessage = Modelo.Constants.CommonConstants.ReturnCodeConsts.USER_ERROR_MESSAGE,
            };
        }

        /// <summary>
        /// Generates a typed Success ReturnCodeInformation
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="resultItem"></param>
        /// <returns></returns>
        public static ReturnCodeInformation<T> GenerateGenericSuccessReturnCode<T>(T resultItem)
        {
            return new ReturnCodeInformation<T>()
            {
                Code = Modelo.Constants.CommonConstants.ReturnCodeConsts.SUCCESS_CODE.ToString(),
                Message = Modelo.Constants.CommonConstants.ReturnCodeConsts.SUCCESS_MESSAGE,
                UserMessage = Modelo.Constants.CommonConstants.ReturnCodeConsts.USER_SUCCESS_MESSAGE,
                ResultItem = resultItem
            };
        }

        #endregion Public methods
    }
}