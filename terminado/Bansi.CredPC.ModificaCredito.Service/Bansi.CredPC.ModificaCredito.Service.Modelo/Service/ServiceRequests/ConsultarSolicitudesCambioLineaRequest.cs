namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Clase que define las propiedades del request para la consulta de solicitudes de línea
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class ConsultarSolicitudesCambioLineaRequest
    {
        #region Propiedades

        public int IdEstatus { get; set; }

        public string? NumeroLinea { get; set; }

        public DateTime FechaRegistroInicio { get; set; }

        public DateTime FechaRegistroFin { get; set; }

        #endregion Propiedades
    }
}