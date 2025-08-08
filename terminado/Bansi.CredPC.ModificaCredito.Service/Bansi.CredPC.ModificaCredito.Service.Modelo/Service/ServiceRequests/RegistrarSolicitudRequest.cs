namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Class to request named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 06/02/2024
    public class RegistrarSolicitudRequest
    {
        #region Propiedades

        public string NumeroCredito { get; set; }

        public string UsuarioSolicita { get; set; }

        public int IdStatusSolicitud { get; set; }

        public List<DetalleSolicitudCambioCuenta> DetalleSolicitud { get; set; }

        public DetalleSolicitudCambioLinea DetalleSolicitudCambioLinea { get; set; }

        public string? Comentario { get; set; }

        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public RegistrarSolicitudRequest()
        {
            this.DetalleSolicitud = new List<DetalleSolicitudCambioCuenta>();
            this.DetalleSolicitudCambioLinea = new DetalleSolicitudCambioLinea();
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <param name="idTipoSolicitud"></param>
        /// <param name="usuarioSolicita"></param>
        /// <param name="idEstatusSolicitud"></param>
        /// <param name="comentario"></param>
        /// <param name="detalleSolicitud"></param>
        public RegistrarSolicitudRequest(string numeroCredito, string usuarioSolicita, int idEstatusSolicitud, string comentario,
            List<DetalleSolicitudCambioCuenta> detalleSolicitud, DetalleSolicitudCambioLinea detalleLinea)
        {
            this.NumeroCredito = numeroCredito;
            this.UsuarioSolicita = usuarioSolicita;
            this.IdStatusSolicitud = idEstatusSolicitud;
            this.Comentario = comentario;
            this.DetalleSolicitud = detalleSolicitud;
            this.DetalleSolicitudCambioLinea = detalleLinea;
        }

        #endregion Constructor
    }
}