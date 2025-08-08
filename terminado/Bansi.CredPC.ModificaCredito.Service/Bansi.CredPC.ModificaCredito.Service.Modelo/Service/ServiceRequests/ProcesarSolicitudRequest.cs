namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Class to request named method
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 06/02/2024
    public class ProcesarSolicitudRequest
    {
        #region Propiedades

        public int IdSolicitud { get; set; }

        public string Usuario { get; set; }

        public string Comentario { get; set; }

        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public ProcesarSolicitudRequest()
        {
            IdSolicitud = 0;
            Usuario = string.Empty;
            Comentario = string.Empty;
        }

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <param name="usuario"></param>
        public ProcesarSolicitudRequest(int idSolicitud, string usuario, string comentarios)
        {
            IdSolicitud = idSolicitud;
            Usuario = usuario;
            Comentario = comentarios;
        }

        #endregion Constructor
    }
}