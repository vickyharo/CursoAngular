namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    public class ObtenerTiposCuentasResponse : GenericServiceResponse<List<TipoCuenta>>
    {
        public ObtenerTiposCuentasResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new();
        }

        public ObtenerTiposCuentasResponse(ReturnCodeInformation<List<TipoCuenta>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public ObtenerTiposCuentasResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new();
        }
    }
}