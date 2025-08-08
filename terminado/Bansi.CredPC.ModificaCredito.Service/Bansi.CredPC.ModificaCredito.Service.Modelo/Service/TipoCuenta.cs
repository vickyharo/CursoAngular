using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    public class TipoCuenta : ITipoCuenta
    {
        public string? ClaveTipoCuenta { get; set; }
        public string? DescripcionTipoCuenta { get; set; }
    }
}