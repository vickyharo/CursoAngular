using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    public class SolicitudCambioLinea : ISolicitudCambioLinea
    {
        #region ISolicitudCambioLinea

        public int IdSolicitud { get; set; }

        public int IdTipoSolicitud { get; set; }

        public string DescripcionTipoSolicitud { get; set; }

        public int IdEstatus { get; set; }

        public string? DescripcionStatus { get; set; }

        public string NumeroLinea { get; set; }

        public string CodProducto { get; set; }

        public string DescProducto { get; set; }

        public string NumeroCliente { get; set; }

        public string NombreCliente { get; set; }

        public string CodDivisa { get; set; }

        public string DescDivisa { get; set; }

        public string CodEjecutivo { get; set; }

        public string NombreEjecutivo { get; set; }

        public string CodSucursal { get; set; }

        public string NombreSucursal { get; set; }

        public Decimal MontoAutorizado { get; set; }

        public Decimal MontoUtilizado { get; set; }

        public DateTime FechaAlta { get; set; }

        public DateTime FechaVencimiento { get; set; }

        public DateTime FechaAutorizacionLinea { get; set; }

        public int PlazoDias { get; set; }

        public string EstatusLinea { get; set; }

        public string DescEstatusLinea { get; set; }

        public string? UsuarioSolicita { get; set; }

        public DateTime FechaSolicitud { get; set; }

        public string? UsuarioAutoriza { get; set; }

        public DateTime? FechaAutorizacion { get; set; }

        public string? Comentarios { get; set; }

        #endregion ISolicitudCambioLinea

        #region Propiedades

        public DetalleSolicitudCambioLinea DetalleSolicitudCambioLinea { get; set; }

        #endregion Propiedades

        #region Constructor

        public SolicitudCambioLinea()
        {
            DetalleSolicitudCambioLinea = new DetalleSolicitudCambioLinea();
        }

        #endregion Constructor
    }
}