namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Class to request named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 06/02/2024
    public class ConsultarInformacionCreditoRequest
    {
        #region Properties

        public string NumeroCredito { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="numeroCredito"></param>
        public ConsultarInformacionCreditoRequest(string numeroCredito)
        {
            NumeroCredito = numeroCredito;
        }

        #endregion Constructor
    }
}