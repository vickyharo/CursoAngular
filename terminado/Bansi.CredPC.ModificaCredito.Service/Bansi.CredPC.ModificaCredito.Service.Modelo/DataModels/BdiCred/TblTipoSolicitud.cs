using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    [Table("tbltiposolicitud", Schema = "informix")]
    public class TblTipoSolicitud : ITipoSolicitud
    {
        #region Propiedades

        [Column("idtiposolicitud")]
        public string? IdTipoSolicitud { get; set; }

        [Column("descripciontiposolicitud")]
        public string? DescripcionTipoSolicitud { get; set; }

        #endregion Propiedades

        #region Constructor

        public TblTipoSolicitud() { }

        #endregion Constructor
    }
}
