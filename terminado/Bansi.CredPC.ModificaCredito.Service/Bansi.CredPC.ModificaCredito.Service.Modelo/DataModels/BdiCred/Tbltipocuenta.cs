
using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Clase para el modelado de tabla en BD
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/06/2024
    [Table("tbltipocuenta", Schema = "informix")]
    public class Tbltipocuenta : ITipoCuenta
    {

        #region Propiedades

        [Column("clavetipocuenta")]
        public string? ClaveTipoCuenta { get; set; }

        [Column("DescripcionTipoCuenta")]
        public string? DescripcionTipoCuenta { get; set; }

        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public Tbltipocuenta() { }

        #endregion  Constructor

    }
}
