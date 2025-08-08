using Bansi.CredPC.AdministracionCartera.Service.Modelo.Interfaces;

namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service
{
    public class Fechas : IFechas
    {
        #region Propiedades

        public DateTime FechaHoy { get; set; }

        public DateTime FechaAnt { get; set; }

        public DateTime ProxFecha { get; set; }

        public DateTime PriDiaNaturalMes { get; set; }

        public DateTime PriDiaHabilMes { get; set; }

        public DateTime UltDiaNaturalMes { get; set; }

        public DateTime UltDiaHabilMes { get; set; }

        public string Version { get; set; }

        #endregion Propiedades

        #region Constructor

        public Fechas(DateTime fechaHoy, DateTime fechaAnt, DateTime proxFecha, DateTime priDiaNaturalMes, DateTime priDiaHabilMes, DateTime ultDiaNaturalMes, DateTime ultDiaHabilMes)
        {
            FechaHoy = fechaHoy;
            FechaAnt = fechaAnt;
            ProxFecha = proxFecha;
            PriDiaNaturalMes = priDiaNaturalMes;
            PriDiaHabilMes = priDiaHabilMes;
            UltDiaNaturalMes = ultDiaNaturalMes;
            UltDiaHabilMes = ultDiaHabilMes;
        }

        public Fechas()
        { }

        #endregion Constructor
    }
}