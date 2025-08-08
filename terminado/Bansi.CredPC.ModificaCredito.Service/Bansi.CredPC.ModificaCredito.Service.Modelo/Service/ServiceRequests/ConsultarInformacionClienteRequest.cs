namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Class to request named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 06/02/2024
    public class ConsultarInformacionClienteRequest
    {
        #region Properties

        public string NumeroCliente { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="numeroCliente"></param>
        public ConsultarInformacionClienteRequest(string numeroCliente)
        {
            NumeroCliente = numeroCliente;
        }

        #endregion Constructor
    }
}