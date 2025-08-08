namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Clase que define las propiedades del request para la consulta de la bitácora
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class ConsultarSolicitudesBitacoraRequest
    {
        #region Propiedades

        public string NumeroCredito { get; }

        public DateTime FechaAutoriza { get; }

        public DateTime FechaSolicita { get; }

        public int TipoSolicitud { get; }

        public int Estatus { get; }

        public string UsuarioAutoriza { get; }

        public string UsuarioSolicita { get; }

        #endregion Propiedades

        #region Constructor

        public ConsultarSolicitudesBitacoraRequest(string numerocredito, DateTime fechaAutoriza, DateTime fechaSolicita,
            int tipoSolicitud, int estatus, string usuarioAutoriza, string usuarioSolicita)
        {
            NumeroCredito = numerocredito;
            FechaAutoriza = fechaAutoriza;
            FechaSolicita = fechaSolicita;
            TipoSolicitud = tipoSolicitud;
            Estatus = estatus;
            UsuarioAutoriza = usuarioAutoriza;
            UsuarioSolicita = usuarioSolicita;
        }

        #endregion Constructor
    }
}