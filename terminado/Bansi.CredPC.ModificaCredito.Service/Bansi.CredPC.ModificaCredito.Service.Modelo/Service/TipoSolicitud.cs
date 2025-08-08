using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    public class TipoSolicitud : ITipoSolicitud
    {
        public string? IdTipoSolicitud { get; set; }

        public string? DescripcionTipoSolicitud { get; set; }
    }
}