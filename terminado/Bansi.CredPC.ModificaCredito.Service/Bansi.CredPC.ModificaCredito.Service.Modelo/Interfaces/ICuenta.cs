namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with account properties
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public interface ICuenta
    {
        #region Properties

        public string? CuentaCheques { get; set; }

        public string? NumeroCliente { get; set; }

        public string? CodDivisa { get; set; }

        public string? Divisa { get; set; }

        public string? TipoCuenta { get; set; }

        public string? Producto { get; set; }

        public string? NombreCliente { get; set; }

        #endregion Properties
    }
}