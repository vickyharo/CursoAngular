using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    /// <summary>
    /// Clase que define las propiedades de una línea de crédito
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class Linea : ILinea
    {
        #region Properties ILinea

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

        #endregion Properties ILinea

        #region Properties

        public string DescProducto { get; set; }

        public string NombreCliente { get; set; }

        public string DescDivisa { get; set; }

        public string NombreEjecutivo { get; set; }

        public string NombreSucursal { get; set; }

        public string DescEstatusLinea { get; set; }

        public bool ExistenSolicitudesPendientesAutorizar { get; set; }

        #endregion Properties

        #region Constructor

        public Linea(string numeroLinea, string codProducto, string descProducto, string numeroCliente, string nombreCliente,
            string codDivisa, string descDivisa, string codEjecutivo, string nombreEjecutivo, string codSucursal,
            string nombreSucursal, Decimal montoAutorizado, Decimal montoUtilizado, DateTime fechaAlta, DateTime fechaVencimiento,
            DateTime fechaAutorizacion, int plazoDias, string estatus, string descEstatus)
        {
            NumeroLinea = numeroLinea;
            CodProducto = codProducto;
            DescProducto = descProducto;
            NumeroCliente = numeroCliente;
            NombreCliente = nombreCliente;
            CodDivisa = codDivisa;
            DescDivisa = descDivisa;
            CodEjecutivo = codEjecutivo;
            NombreEjecutivo = nombreEjecutivo;
            CodSucursal = codSucursal;
            NombreSucursal = nombreSucursal;
            MontoAutorizado = montoAutorizado;
            MontoUtilizado = montoUtilizado;
            FechaAlta = fechaAlta;
            FechaVencimiento = fechaVencimiento;
            FechaAutorizacionLinea = fechaAutorizacion;
            PlazoDias = plazoDias;
            Estatus = estatus;
            DescEstatusLinea = descEstatus;
        }

        #endregion Constructor
    }
}