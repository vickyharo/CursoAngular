namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with statuses properties
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public interface IEstatusSolicitudCambioCuenta
    {
        #region Properties

        public int IdEstatusSolicitud { get; set; }

        public string? DescripcionEstatus { get; set; }

        #endregion Properties
    }
}