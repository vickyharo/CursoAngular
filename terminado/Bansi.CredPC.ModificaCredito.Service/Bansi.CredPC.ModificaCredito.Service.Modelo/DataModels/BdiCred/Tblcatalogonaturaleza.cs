
using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Clase para el modelado de tabla en BD
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/06/2024
    [Table("tblcatalogonaturaleza", Schema = "informix")]
    public class Tblcatalogonaturaleza : INaturaleza
    {

        #region Propiedades

        [Column("ClaveNaturaleza")]
        public string? ClaveNaturaleza { get; set; }

        [Column("DescripcionNaturaleza")]
        public string? DescripcionNaturaleza { get; set; }

        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public Tblcatalogonaturaleza() { }

        #endregion Constructor

    }
}
