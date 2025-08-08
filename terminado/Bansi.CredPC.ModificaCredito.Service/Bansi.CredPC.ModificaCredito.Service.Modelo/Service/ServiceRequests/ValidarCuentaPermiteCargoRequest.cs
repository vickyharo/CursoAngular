namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    public class ValidarCuentaPermiteCargoRequest
    {
        #region Propiedades

        public string NumeroCuenta { get; set; }
        public string NumeroCredito { get; set; }
        public string Producto { get; set; }

        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="numeroCuenta"></param>
        public ValidarCuentaPermiteCargoRequest(string numeroCuenta, string numeroCredito, string producto)
        {
            NumeroCuenta = numeroCuenta;
            NumeroCredito = numeroCredito;
            Producto = producto;
        }

        #endregion Constructor
    }
}