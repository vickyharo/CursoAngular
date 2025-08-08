
using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Clase para el modelado de la tabla en BD
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 11/06/2024
    [Table("tblestatussolicitudcambiocuenta", Schema = "informix")]
    public class Tblestatussolicitudcambiocuenta : IEstatusSolicitudCambioCuenta
    {

        #region Properties

        [Column("IdEstatusSolicitud", TypeName = "serial")]
        public int IdEstatusSolicitud { get; set; }

        [Column("DescripcionEstatus")]
        public string? DescripcionEstatus { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public Tblestatussolicitudcambiocuenta() { }


        #endregion Constructor

    }
}
