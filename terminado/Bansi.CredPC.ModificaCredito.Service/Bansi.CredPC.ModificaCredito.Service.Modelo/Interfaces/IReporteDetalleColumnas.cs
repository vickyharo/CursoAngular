namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    public interface IReporteDetalleColumnas
    {
        #region Propiedades

        public int IdDetalle { get; set; }

        public int IdTipoReporte { get; set; }

        public string ColumnaVisible { get; set; }

        public string ReportHeader { get; set; }

        #endregion Propiedades
    }
}