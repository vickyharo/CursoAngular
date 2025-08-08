using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    [Table("tblReporteDetalleColumnas", Schema = "informix")]
    public class TblReporteDetalleColumnas : IReporteDetalleColumnas
    {
        #region Propiedades

        [Column("IdDetalle", TypeName = "serial")]
        public int IdDetalle { get; set; }

        [Column("IdTipoReporte")]
        public int IdTipoReporte { get; set; }

        [Column("ColumnaVisible")]
        public string ColumnaVisible { get; set; }

        [Column("ReportHeader")]
        public string ReportHeader { get; set; }

        #endregion Propiedades

        #region Constructor
        
        public TblReporteDetalleColumnas() { }

        public TblReporteDetalleColumnas(int idDetalle, int idTipoReporte, string columnaVisible, string reportHeader)
        {
            IdDetalle = idDetalle;
            IdTipoReporte = idTipoReporte;
            ColumnaVisible = columnaVisible;
            ReportHeader = reportHeader;
        }



        #endregion Constructor
    }
}
