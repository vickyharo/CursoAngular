namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceResponses
{
    public class ObtenerColumnasReportesResponse : GenericServiceResponse<List<ReporteDetalleColumnas>>
    {
        public ObtenerColumnasReportesResponse(IReturnCodeInformation returnCode)
            : base(returnCode)
        {
            OperationResultItem = new();
        }

        public ObtenerColumnasReportesResponse(ReturnCodeInformation<List<ReporteDetalleColumnas>> returnCode)
            : base(returnCode)
        {
            OperationResultItem = returnCode.ResultItem;
        }

        public ObtenerColumnasReportesResponse(object code, string message)
            : base(code, message)
        {
            OperationResultItem = new();
        }
    }
}