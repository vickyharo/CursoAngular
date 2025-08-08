namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    /// <summary>
    /// Class to response to named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 06/02/2024
    public class ObtenerNaturalezasResponse : GenericServiceResponse<List<Naturaleza>>
    {
        public ObtenerNaturalezasResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new();
        }

        public ObtenerNaturalezasResponse(ReturnCodeInformation<List<Naturaleza>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public ObtenerNaturalezasResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new();
        }
    }
}