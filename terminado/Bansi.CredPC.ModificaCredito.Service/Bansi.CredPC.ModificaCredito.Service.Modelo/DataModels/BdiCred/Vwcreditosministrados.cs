
using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Clase para el modelado de Creditos
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 09/07/2024
    [Table("vwcreditosministrados", Schema = "informix")]
    public class Vwcreditosministrados : ICreditoMinistrado
    {

        #region Properties

        [Column("NumeroCredito")]
        public string? NumeroCredito { get; set; }

        [Column("EstatusCredito")]
        public string? EstatusCredito { get; set; }

        [Column("NumeroCliente")]
        public string? NumeroCliente { get; set; }

        [Column("NombreCliente")]
        public string? NombreCliente { get; set; }

        [Column("NumeroProducto")]
        public string? NumeroProducto { get; set; }

        [Column("NombreProducto")]
        public string? NombreProducto { get; set; }

        [Column("PeriodoPlazo")]
        public string? PeriodoPlazo { get; set; }

        [Column("Plazo")]
        public string? Plazo { get; set; }

        [Column("Ejecutivo")]
        public string? Ejecutivo { get; set; }

        [Column("NombreEjecutivo")]
        public string? NombreEjecutivo { get; set; }

        [Column("FechaApertura", TypeName = "DATE")]
        public DateTime FechaApertura { get; set; }

        [Column("FechaVencimiento", TypeName = "DATE")]
        public DateTime FechaVencimiento { get; set; }

        [Column("FechaMinistracion", TypeName = "DATE")]
        public DateTime FechaMinistracion { get; set; }

        [Column("MontoOtorgado", TypeName = "MONEY(14,2)")]
        public decimal MontoOtorgado { get; set; }

        [Column("MontoMinistrado", TypeName = "MONEY(14,2)")]
        public decimal MontoMinistrado { get; set; }

        [Column("Sucursal")]
        public string? Sucursal { get; set; }

        [Column("NombreSucursal")]
        public string? NombreSucursal { get; set; }

        [Column("Cuenta")]
        public string? Cuenta { get; set; }

        [Column("Factoraje")]
        public string? Factoraje { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public Vwcreditosministrados() { }

        #endregion Constructor

    }
}
