namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    public class ObtenerFechaVersionResponse : GenericServiceResponse<Fechas>
    {
        /// <summary>
        /// DefaultConstructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ObtenerFechaVersionResponse(ReturnCodeInformation<Fechas> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="returnCode"></param>
        public ObtenerFechaVersionResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="code"></param>
        /// <param name="message"></param>
        public ObtenerFechaVersionResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new();
        }
    }
}