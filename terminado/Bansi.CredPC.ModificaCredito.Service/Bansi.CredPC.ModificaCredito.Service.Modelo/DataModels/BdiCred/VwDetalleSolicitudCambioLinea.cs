using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Clase para el modelado de detalle solicitudes
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    [Table("vwdetallesolicitudcambiolinea", Schema = "informix")]
    public class VwDetalleSolicitudCambioLinea : IDetalleSolicitudCambioLinea
    {
        #region Propiedades

        [Column("iddetalle")]
        public int IdDetalle { get; set; }

        [Column("idsolicitud")]
        public int IdSolicitud { get; set; }

        [Column("montooriginal")]
        public Decimal MontoOriginal { get; set; }

        [Column("montonuevo")]
        public Decimal MontoNuevo { get; set; }

        #endregion Propiedades

        #region Constructor

        public VwDetalleSolicitudCambioLinea() { }

        #endregion Constructor
    }
}
