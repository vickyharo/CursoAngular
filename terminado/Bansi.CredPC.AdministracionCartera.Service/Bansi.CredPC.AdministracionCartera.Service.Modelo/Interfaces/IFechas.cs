namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Interfaces
{
    public interface IFechas
    {
        public DateTime FechaHoy { get; set; }

        public DateTime FechaAnt { get; set; }

        public DateTime ProxFecha { get; set; }

        public DateTime PriDiaNaturalMes { get; set; }

        public DateTime PriDiaHabilMes { get; set; }

        public DateTime UltDiaNaturalMes { get; set; }

        public DateTime UltDiaHabilMes { get; set; }
    }
}