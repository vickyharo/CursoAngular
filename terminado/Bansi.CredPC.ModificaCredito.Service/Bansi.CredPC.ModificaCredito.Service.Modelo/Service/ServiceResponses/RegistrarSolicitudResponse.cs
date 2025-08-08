namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    public class RegistrarSolicitudResponse : GenericServiceResponse<int>
    {
        public RegistrarSolicitudResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = -1;
        }

        public RegistrarSolicitudResponse(ReturnCodeInformation<int> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public RegistrarSolicitudResponse(object code, string message) : base(code, message)
        {
            OperationResultItem = -1;
        }
    }
}