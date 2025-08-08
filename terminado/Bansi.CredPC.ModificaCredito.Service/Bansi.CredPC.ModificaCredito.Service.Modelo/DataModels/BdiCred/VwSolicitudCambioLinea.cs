using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred
{
    /// <summary>
    /// Class to model view from DataBase
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    [Table("vwsolicitudcambiolinea", Schema = "informix")]
    public class VwSolicitudCambioLinea : ISolicitudCambioLinea
    {
        #region Propiedades
        
        [Column("IdSolicitud")]
        public int IdSolicitud { get; set; }

        [Column("IdTipoSolicitud")]
        public int IdTipoSolicitud { get; set; }

        [Column("DescripcionTipoSolicitud")]
        public string DescripcionTipoSolicitud { get; set; }

        [Column("IdEstatus")]
        public int IdEstatus { get; set; }

        [Column("DescripcionEstatus")]
        public string? DescripcionStatus { get; set; }

        [Column("NumeroLinea")]
        public string NumeroLinea { get; set; }

        [Column("CodProducto")]
        public string CodProducto { get; set; }

        [Column("Producto")]
        public string DescProducto { get; set; }

        [Column("NumeroCliente")]
        public string NumeroCliente { get; set; }

        [Column("NombreCliente")]
        public string NombreCliente { get; set; }

        [Column("Divisa")]
        public string CodDivisa { get; set; }

        [Column("DescripcionDivisa")]
        public string DescDivisa { get; set; }

        [Column("NumeroEjecutivo")]
        public string CodEjecutivo { get; set; }

        [Column("NombreEjecutivo")]
        public string NombreEjecutivo { get; set; }

        [Column("CodSucursal")]
        public string CodSucursal { get; set; }

        [Column("NombreSucursal")]
        public string NombreSucursal { get; set; }

        [Column("MontoAutorizado")]
        public Decimal MontoAutorizado { get; set; }

        [Column("MontoUtilizado")]
        public Decimal MontoUtilizado { get; set; }

        [Column("FechaAlta")]
        public DateTime FechaAlta { get; set; }

        [Column("FechaVencimiento")]
        public DateTime FechaVencimiento { get; set; }

        [Column("FechaAutorizacionLinea")]
        public DateTime FechaAutorizacionLinea { get; set; }

        [Column("PlazoDias")]
        public int PlazoDias { get; set; }

        [Column("EstatusLinea")]
        public string EstatusLinea { get; set; }

        [Column("DescEstatusLinea")]
        public string DescEstatusLinea { get; set; }
        
        [Column("UsuarioSolicita")]
        public string? UsuarioSolicita { get; set; }

        [Column("FechaSolicitud")]
        public DateTime FechaSolicitud { get; set; }

        [Column("UsuarioAutoriza")]
        public string? UsuarioAutoriza { get; set; }

        [Column("FechaAutorizaCambio")]
        public DateTime? FechaAutorizacion { get; set; }

        [Column("Comentarios")]
        public string? Comentarios { get; set; }

        #endregion Propiedades
    }
}
