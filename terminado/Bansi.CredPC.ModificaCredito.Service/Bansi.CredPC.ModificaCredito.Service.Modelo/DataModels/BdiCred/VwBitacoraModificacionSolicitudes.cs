using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Clase para el modelado de solicitudes
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    [Table("vwBitacoraModificacionSolicitudes", Schema = "informix")]
    public class VwBitacoraModificacionSolicitudes : ISolicitudesBitacora
    {
        #region Propiedades

        [Column("idsolicitud")]
        public int? IdSolicitud { get; set; }

        [Column("numerocredito_linea")]
        public string? NumeroCredito_Linea { get; set; }

        [Column("idtiposolicitud")]
        public int? IdTipoSolicitud { get; set; }

        [Column("desctiposolicitud")]
        public string? DescripcionTipoSolicitud { get; set; }

        [Column("usuariosolicita")]
        public string? UsuarioSolicita { get; set; }

        [Column("fechasolicitud")]
        public DateTime? FechaSolicitud { get; set; }

        [Column("idestatus")]
        public int? IdEstatus { get; set; }

        [Column("descestatus")]
        public string? DescripcionEstatus { get; set; }

        [Column("usuarioautoriza")]
        public string? UsuarioAutoriza { get; set; }

        [Column("fechaautorizacion")]
        public DateTime? FechaAutoriza { get; set; }

        [Column("comentarios")]
        public string? Comentarios { get; set; }


        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        public VwBitacoraModificacionSolicitudes() { }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <param name="numeroCredito"></param>
        /// <param name="idTipoSolicitud"></param>
        /// <param name="descripcionTipoSolicitud"></param>
        /// <param name="usuarioSolicita"></param>
        /// <param name="fechaSolicitud"></param>
        /// <param name="idEstatus"></param>
        /// <param name="descripcionEstatus"></param>
        /// <param name="usuarioAutoriza"></param>
        /// <param name="fechaAutoriza"></param>
        /// <param name="comentarios"></param>
        public VwBitacoraModificacionSolicitudes(int idSolicitud, string numeroCredito, int idTipoSolicitud, string descripcionTipoSolicitud,
            string usuarioSolicita, DateTime fechaSolicitud, int idEstatus, string descripcionEstatus, string usuarioAutoriza,
            DateTime fechaAutoriza, string comentarios)
        {
            IdSolicitud = idSolicitud;
            NumeroCredito_Linea = numeroCredito;
            IdTipoSolicitud = idTipoSolicitud;
            DescripcionTipoSolicitud = descripcionTipoSolicitud;
            UsuarioSolicita = usuarioSolicita;
            FechaSolicitud = fechaSolicitud;
            IdEstatus = idEstatus;
            DescripcionEstatus = descripcionEstatus;
            UsuarioAutoriza = usuarioAutoriza;
            FechaAutoriza = fechaAutoriza;
            Comentarios = comentarios;
        }

        #endregion Constructor
    }
}
