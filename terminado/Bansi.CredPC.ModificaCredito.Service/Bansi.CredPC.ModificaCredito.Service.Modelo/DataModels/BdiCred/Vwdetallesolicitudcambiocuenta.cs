
using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{

    /// <summary>
    /// Clase de modelado de vista en BD
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/06/2024 
    [Table("vwdetallesolicitudcambiocuenta", Schema = "informix")]
    public partial class Vwdetallesolicitudcambiocuenta : IDetalleSolicitud
    {

        #region Propiedades

        [Column("clavenaturaleza")]
        public string? Clavenaturaleza { get; set; }

        [Column("clavetipocuenta")]
        public string? Clavetipocuenta { get; set; }

        [Column("Coddivctanueva")]
        public string? Coddivctanueva { get; set; }

        [Column("Coddivctaoriginal")]
        public string? Coddivctaoriginal { get; set; }

        [Column("Codpdctoctanueva")]
        public string? Codpdctoctanueva { get; set; }

        [Column("Codpdctoctaoriginal")]
        public string? Codpdctoctaoriginal { get; set; }

        [Column("Cuentanueva")]
        public string? Cuentanueva { get; set; }

        [Column("Cuentaoriginal")]
        public string? Cuentaoriginal { get; set; }

        [Column("Descdivctanueva")]
        public string? Descdivctanueva { get; set; }

        [Column("Descdivctaoriginal")]
        public string? Descdivctaoriginal { get; set; }

        [Column("Descpdctoctanueva")]
        public string? Descpdctoctanueva { get; set; }

        [Column("Descpdctoctaoriginal")]
        public string? Descpdctoctaoriginal { get; set; }

        [Column("Iddetalle", TypeName = "INTEGER")]
        public int Iddetalle { get; set; }

        [Column("Idsolicitud", TypeName = "INTEGER")]
        public int Idsolicitud { get; set; }

        [Column("Naturaleza")]
        public string? Naturaleza { get; set; }

        [Column("Tipocuenta")]
        public string? Tipocuenta { get; set; }

        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public Vwdetallesolicitudcambiocuenta() { }

        #endregion Constructor

    }
}
