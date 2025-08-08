namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface que obtiene todas las solicitudes
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public interface ISolicitudesBitacora
    {
        #region Properties

        public int? IdSolicitud { get; set; }

        public string? NumeroCredito_Linea { get; set; }

        public int? IdTipoSolicitud { get; set; }

        public string? DescripcionTipoSolicitud { get; set; }

        public string? UsuarioSolicita { get; set; }

        public DateTime? FechaSolicitud { get; set; }

        public int? IdEstatus { get; set; }

        public string? DescripcionEstatus { get; set; }

        public string? UsuarioAutoriza { get; set; }

        public DateTime? FechaAutoriza { get; set; }

        public string? Comentarios { get; set; }

        #endregion Properties
    }
}