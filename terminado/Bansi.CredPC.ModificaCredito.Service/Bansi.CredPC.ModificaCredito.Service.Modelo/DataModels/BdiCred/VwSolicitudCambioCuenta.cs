using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Class to model view from DataBase
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 19/12/2024
    [Table("vwSolicitudModificacion", Schema = "informix")]
    public partial class VwSolicitudModificacion : ISolicitudCambioCuenta
    {

        #region IvwSolicitudModificacion

        [Column("IdSolicitud", TypeName = "INTEGER")]
        public int IdSolicitud { get; set; }

        [Column("IdTipoSolicitud", TypeName = "INTEGER")]
        public int IdTipoSolicitud { get; set; }
        
        [Column("DescripcionTipoSolicitud", TypeName = "VARCHAR(255)")]
        public string? DescripcionTipoSolicitud { get; set; }

        [Column("IdEstatus", TypeName = "INTEGER")]
        public int IdEstatus { get; set; }

        [Column("DescripcionStatus", TypeName = "VARCHAR(255)")]
        public string? DescripcionStatus { get; set; }

        [Column("NumeroCredito", TypeName = "VARCHAR(255)")]
        public string? NumeroCredito { get; set; }

        [Column("ProductoCredito", TypeName = "VARCHAR(255)")]
        public string? ProductoCredito { get; set; }

        [Column("DescripcionProducto", TypeName = "VARCHAR(255")]
        public string? DescripcionProducto { get; set; }

        [Column("CodigoEjecutivo", TypeName = "VARCHAR(255)")]
        public string? CodigoEjecutivo { get; set; }

        [Column("Ejecutivo", TypeName = "VARCHAR(255)")]
        public string? Ejecutivo { get; set; }

        [Column("NumeroCliente", TypeName = "VARCHAR(255)")]
        public string? NumeroCliente { get; set; }

        [Column("NombreCliente", TypeName = "VARCHAR(255)")]
        public string? NombreCliente { get; set; }

        [Column("CodDivisa", TypeName = "VARCHAR(255)")]
        public string? CodDivisa { get; set; }

        [Column("Divisa", TypeName = "VARCHAR(255)")]
        public string? Divisa { get; set; }

        [Column("CodigoSucursal", TypeName = "VARCHAR(255)")]
        public string? CodigoSucursal { get; set; }

        [Column("Sucursal", TypeName = "VARCHAR(255)")]
        public string? Sucursal { get; set; }

        [Column("StatusCredito", TypeName = "VARCHAR(255)")]
        public string? StatusCredito { get; set; }

        [Column("UsuarioSolicita", TypeName = "VARCHAR(255)")]
        public string? UsuarioSolicita { get; set; }

        [Column("FechaSolicitud", TypeName = "DATE")]
        public DateTime FechaSolicitud { get; set; }

        [Column("UsuarioAutoriza", TypeName = "VARCHAR(255)")]
        public string? UsuarioAutoriza { get; set; }

        [Column("FechaAutorizacion", TypeName = "DATE")]
        public DateTime? FechaAutorizacion { get; set; }

        [Column("Comentarios", TypeName = "VARCHAR(255)")]
        public string? Comentarios { get; set; }

        #endregion IvwSolicitudModificacion


    }
}
