namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface que define las propiedades de tipo de solicitud
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public interface ITipoSolicitud
    {
        #region Properties

        public string? IdTipoSolicitud { get; set; }

        public string? DescripcionTipoSolicitud { get; set; }

        #endregion Properties
    }
}