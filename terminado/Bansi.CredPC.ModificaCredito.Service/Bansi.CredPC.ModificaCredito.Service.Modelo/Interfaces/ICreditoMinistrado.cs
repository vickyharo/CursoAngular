namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with minister credit properties to implement
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public interface ICreditoMinistrado
    {
        #region Properties

        public string? NumeroCredito { get; set; }

        public string? EstatusCredito { get; set; }

        public string? NumeroCliente { get; set; }

        public string? NombreCliente { get; set; }

        public string? NumeroProducto { get; set; }

        public string? NombreProducto { get; set; }

        public string? PeriodoPlazo { get; set; }

        public string? Plazo { get; set; }

        public string? Ejecutivo { get; set; }

        public string? NombreEjecutivo { get; set; }

        public DateTime FechaApertura { get; set; }

        public DateTime FechaVencimiento { get; set; }

        public DateTime FechaMinistracion { get; set; }

        public decimal MontoOtorgado { get; set; }

        public decimal MontoMinistrado { get; set; }

        public string? Sucursal { get; set; }

        public string? NombreSucursal { get; set; }

        public string? Cuenta { get; set; }

        public string? Factoraje { get; set; }

        #endregion Properties
    }
}