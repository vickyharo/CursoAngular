
using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Clase para el modelado de cuentas asociadas al credito
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/07/2024
    [Table("vwcuentasasociadascredito", Schema = "informix")]
    public class Vwcuentasasociadascredito : ICuentaAsociadaCredito
    {

        #region Propiedades

        [Column("NumeroCredito")]
        public string? NumeroCredito { get; set; }

        [Column("CodTipoCuenta")]
        public string CodTipoCuenta { get; set; }
        
        [Column("TipoCuenta")]
        public string? TipoCuenta { get; set; }

        [Column("CodNaturaleza")]
        public string CodNaturaleza { get; set; }

        [Column("Naturaleza")]
        public string Naturaleza { get; set; }

        [Column("CuentaCheques")]
        public string? CuentaCheques { get; set; }

        [Column("AplicacionCuenta")]
        public string AplicacionCuenta { get; set; }

        [Column("NumeroCliente")]
        public string? NumeroCliente { get; set; }

        [Column("CodDivisa")]
        public string? CodDivisa { get; set; }

        [Column("Divisa")]
        public string? Divisa { get; set; }

        [Column("Producto")]
        public string? Producto {  get; set; }

        [Column("NombreCliente")]
        public string? NombreCliente { get; set; }

        [Column("EsProductoChequesCredito")]
        public string? EsProductoChequesCredito { get; set; }

        #endregion Propiedades

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        public Vwcuentasasociadascredito() { }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <param name="codTipoCuenta"></param>
        /// <param name="tipoCuenta"></param>
        /// <param name="codNaturaleza"></param>
        /// <param name="naturaleza"></param>
        /// <param name="cuentaCheques"></param>
        /// <param name="aplicacionCuenta"></param>
        /// <param name="numeroCliente"></param>
        /// <param name="codDivisa"></param>
        /// <param name="divisa"></param>
        /// <param name="esProductoChequesCredit"></param>
        public Vwcuentasasociadascredito(string numeroCredito, string codTipoCuenta, string tipoCuenta, string codNaturaleza, string naturaleza, string cuentaCheques, string aplicacionCuenta, string numeroCliente, string codDivisa, string divisa, string esProductoChequesCredit, string producto, string nombreCliente)
        {
            NumeroCredito = numeroCredito;
            CodTipoCuenta = codTipoCuenta;
            TipoCuenta = tipoCuenta;
            CodNaturaleza = codNaturaleza;
            Naturaleza = naturaleza;
            CuentaCheques = cuentaCheques;
            AplicacionCuenta = aplicacionCuenta;
            NumeroCliente = numeroCliente;
            CodDivisa = codDivisa;
            Divisa = divisa;
            EsProductoChequesCredito = esProductoChequesCredit;
            Producto = producto;
            NombreCliente = nombreCliente;
        }

        #endregion Constructor

    }
}
