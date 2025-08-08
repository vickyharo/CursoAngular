using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    public class EstatusSolicitudCambioCuenta : IEstatusSolicitudCambioCuenta
    {
        #region Properties

        public int IdEstatusSolicitud { get; set; }

        public string? DescripcionEstatus { get; set; }

        #endregion Properties
    }
}