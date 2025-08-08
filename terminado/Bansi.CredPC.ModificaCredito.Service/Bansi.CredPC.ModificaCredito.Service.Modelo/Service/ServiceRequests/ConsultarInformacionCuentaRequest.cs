namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Class to request named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 06/02/2024
    public class ConsultarInformacionCuentaRequest
    {
        #region Properties

        public string NumeroCuenta { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="numeroCuenta"></param>
        public ConsultarInformacionCuentaRequest(string numeroCuenta)
        {
            NumeroCuenta = numeroCuenta;
        }

        #endregion Constructor
    }
}