namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Class to return information from named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 27/02/2025
    public class ConsultarCuentasAsociadasCreditoResponse : GenericServiceResponse<List<CuentaAsociadaCredito>>
    {
        public ConsultarCuentasAsociadasCreditoResponse(IReturnCodeInformation returnCode) : base(returnCode)
        {
            OperationResultItem = default;
        }

        public ConsultarCuentasAsociadasCreditoResponse(ReturnCodeInformation<List<CuentaAsociadaCredito>> returnCode) : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public ConsultarCuentasAsociadasCreditoResponse(object code, string message) : base(code, message)
        {
            OperationResultItem = default;
        }
    }
}