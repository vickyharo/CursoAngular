using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    public class Naturaleza : INaturaleza
    {
        public string? ClaveNaturaleza { get; set; }

        public string? DescripcionNaturaleza { get; set; }
    }
}