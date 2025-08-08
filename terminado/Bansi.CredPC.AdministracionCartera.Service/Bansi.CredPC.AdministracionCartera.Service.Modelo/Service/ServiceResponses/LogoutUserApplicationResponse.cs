namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceResponses
{
    public class LogoutUserApplicationResponse : GenericServiceResponse<bool>
    {
        public LogoutUserApplicationResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.Success;
        }

        public LogoutUserApplicationResponse(ReturnCodeInformation<bool> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public LogoutUserApplicationResponse(object code, string message) : base(code, message)
        {
            OperationResultItem = ReturnCodeInformation.IsSuccess(code);
        }
    }
}