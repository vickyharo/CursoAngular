namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface que define el detalle de solictud cambio linea
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public interface IDetalleSolicitudCambioLinea
    {
        #region Propiedades

        public int IdDetalle { get; set; }

        public int IdSolicitud { get; set; }

        public Decimal MontoOriginal { get; set; }

        public Decimal MontoNuevo { get; set; }

        #endregion Propiedades
    }
}