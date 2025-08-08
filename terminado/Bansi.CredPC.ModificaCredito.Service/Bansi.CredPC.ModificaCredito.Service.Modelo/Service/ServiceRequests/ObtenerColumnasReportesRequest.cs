namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    public class ObtenerColumnasReportesRequest
    {
        #region Propiedades

        public int IdTipoReporte { get; }

        #endregion Propiedades

        #region Constructor

        public ObtenerColumnasReportesRequest(int idTipoReporte)
        {
            IdTipoReporte = idTipoReporte;
        }

        #endregion Constructor
    }
}