using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    public class ReporteDetalleColumnas : IReporteDetalleColumnas
    {
        public int IdDetalle { get; set; }

        public int IdTipoReporte { get; set; }

        public string ColumnaVisible { get; set; }

        public string ReportHeader { get; set; }
    }
}