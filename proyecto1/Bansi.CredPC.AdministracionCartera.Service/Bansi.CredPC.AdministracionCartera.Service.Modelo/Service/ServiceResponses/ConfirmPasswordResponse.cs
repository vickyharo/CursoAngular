namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceResponses
{
    public class ConfirmPasswordResponse : GenericServiceResponse<bool>
    {
        public ConfirmPasswordResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = default;
        }

        public ConfirmPasswordResponse(ReturnCodeInformation<bool> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public ConfirmPasswordResponse(object code, string message) : base(code, message)
        {
            OperationResultItem = default;
        }
    }
}