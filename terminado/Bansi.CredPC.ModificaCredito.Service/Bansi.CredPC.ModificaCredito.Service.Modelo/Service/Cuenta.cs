using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    /// <summary>
    /// Class to model an account
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 26/12/2024
    public class Cuenta : ICuenta
    {
        #region ICuenta

        public string? CuentaCheques { get; set; }

        public string? TipoCuenta { get; set; }

        public string? NumeroCliente { get; set; }

        public string? Divisa { get; set; }

        public string? CodDivisa { get; set; }

        public string? Producto { get; set; }

        #endregion ICuenta

        #region Properties

        public string NombreCliente { get; set; }

        public string TipoPersonaCte { get; set; }

        public string TipoCliente { get; set; }

        public string EstatusCte { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="cuentaCheques"></param>
        /// <param name="tipoCuenta"></param>
        /// <param name="numeroCliente"></param>
        /// <param name="nombreCliente"></param>
        /// <param name="tipoPersonaCte"></param>
        /// <param name="tipoCliente"></param>
        /// <param name="estatusCte"></param>
        /// <param name="codigoDivisa"></param>
        /// <param name="divisa"></param>
        public Cuenta(string cuentaCheques, string tipoCuenta, string numeroCliente, string nombreCliente, string tipoPersonaCte, string tipoCliente, string estatusCte, string codigoDivisa, string divisa, string producto)
        {
            CuentaCheques = cuentaCheques;
            TipoCuenta = tipoCuenta;
            NumeroCliente = numeroCliente;
            NombreCliente = nombreCliente;
            TipoPersonaCte = tipoPersonaCte;
            TipoCliente = tipoCliente;
            EstatusCte = estatusCte;
            CodDivisa = codigoDivisa;
            Divisa = divisa;
            Producto = producto;
        }

        #endregion Constructor
    }
}