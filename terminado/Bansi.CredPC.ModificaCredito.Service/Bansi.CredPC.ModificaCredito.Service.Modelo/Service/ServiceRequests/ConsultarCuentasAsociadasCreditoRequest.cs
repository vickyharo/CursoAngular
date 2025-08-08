namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Class to request to named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 27/02/2025
    public class ConsultarCuentasAsociadasCreditoRequest
    {
        #region Properties

        public string NumeroCredito { get; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="numeroCredito"></param>
        public ConsultarCuentasAsociadasCreditoRequest(string numeroCredito)
        {
            NumeroCredito = numeroCredito;
        }

        #endregion Constructor
    }
}