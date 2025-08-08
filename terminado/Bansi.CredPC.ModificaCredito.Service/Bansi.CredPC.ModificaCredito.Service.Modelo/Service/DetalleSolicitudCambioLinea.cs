using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    /// <summary>
    /// Clase que define las propiedades del detalle de solicitud cambio de línea
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class DetalleSolicitudCambioLinea : IDetalleSolicitudCambioLinea
    {
        #region Propiedades

        public int IdDetalle { get; set; }

        public int IdSolicitud { get; set; }

        public Decimal MontoOriginal { get; set; }

        public Decimal MontoNuevo { get; set; }

        #endregion Propiedades
    }
}