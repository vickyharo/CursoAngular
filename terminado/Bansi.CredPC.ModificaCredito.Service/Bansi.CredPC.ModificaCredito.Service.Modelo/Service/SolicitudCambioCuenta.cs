using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    public class SolicitudCambioCuenta : ISolicitudCambioCuenta
    {
        #region ISolicitudCambioCuenta

        public int IdSolicitud { get; set; }

        public int IdTipoSolicitud { get; set; }

        public string DescripcionTipoSolicitud { get; set; }

        public int IdEstatus { get; set; }

        public string? DescripcionStatus { get; set; }

        public string? NumeroCredito { get; set; }

        public string? ProductoCredito { get; set; }

        public string? DescripcionProducto { get; set; }

        public string? CodigoEjecutivo { get; set; }

        public string? Ejecutivo { get; set; }

        public string? NumeroCliente { get; set; }

        public string? NombreCliente { get; set; }

        public string? CodDivisa { get; set; }

        public string? Divisa { get; set; }

        public string? CodigoSucursal { get; set; }

        public string? Sucursal { get; set; }

        public string? StatusCredito { get; set; }

        public string? UsuarioSolicita { get; set; }

        public DateTime FechaSolicitud { get; set; }

        public string? UsuarioAutoriza { get; set; }

        public DateTime? FechaAutorizacion { get; set; }

        public string? Comentarios { get; set; }

        #endregion ISolicitudCambioCuenta

        #region Properties

        public List<DetalleSolicitudCambioCuenta> DetalleSolicitud { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public SolicitudCambioCuenta()
        {
            this.DetalleSolicitud = new List<DetalleSolicitudCambioCuenta>();
        }

        #endregion Constructor
    }
}