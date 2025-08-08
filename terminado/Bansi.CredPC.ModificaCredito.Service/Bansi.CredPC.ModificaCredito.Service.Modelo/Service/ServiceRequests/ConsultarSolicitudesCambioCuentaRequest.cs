namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Class to request to named method
    /// </summary>
    /// Jorge alejandro Ruiz Murillo, 06/02/2024
    public class ConsultarSolicitudesCambioCuentaRequest
    {
        #region Properties

        public int IdStatus { get; set; }

        public string? NumeroCredito { get; set; }

        public DateTime FechaInicio { get; set; }

        public DateTime FechaFin { get; set; }

        #endregion Properties
    }
}