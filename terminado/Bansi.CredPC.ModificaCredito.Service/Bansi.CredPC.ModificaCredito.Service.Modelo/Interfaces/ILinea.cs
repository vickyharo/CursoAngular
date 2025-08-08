namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface que define las propiedades de una línea
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public interface ILinea
    {
        #region Properties

        public string NumeroLinea { get; set; }

        public string CodProducto { get; set; }

        public string NumeroCliente { get; set; }

        public string CodDivisa { get; set; }

        public string CodEjecutivo { get; set; }

        public string CodSucursal { get; set; }

        public Decimal MontoAutorizado { get; set; }

        public Decimal MontoUtilizado { get; set; }

        public DateTime FechaAlta { get; set; }

        public DateTime FechaVencimiento { get; set; }

        public DateTime FechaAutorizacionLinea { get; set; }

        public int PlazoDias { get; set; }

        public string Estatus { get; set; }

        #endregion Properties
    }
}