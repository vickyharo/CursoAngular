namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Clase que define el request para la consulta de información de una línea
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class ConsultarInformacionLineaRequest
    {
        #region Properties

        public string NumeroLinea { get; set; }

        #endregion Properties

        #region Constructor

        public ConsultarInformacionLineaRequest(string numeroLinea)
        {
            NumeroLinea = numeroLinea;
        }

        #endregion Constructor
    }
}