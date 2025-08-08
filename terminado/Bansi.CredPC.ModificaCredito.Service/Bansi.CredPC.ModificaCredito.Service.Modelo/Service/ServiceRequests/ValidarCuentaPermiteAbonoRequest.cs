namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    public class ValidarCuentaPermiteAbonoRequest
    {
        #region Propiedades

        public string NumeroCuenta { get; set; }

        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="numeroCuenta"></param>
        public ValidarCuentaPermiteAbonoRequest(string numeroCuenta)
        {
            NumeroCuenta = numeroCuenta;
        }

        #endregion Constructor
    }
}