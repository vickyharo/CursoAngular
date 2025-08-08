namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with account type
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public interface ITipoCuenta
    {
        #region Properties

        public string? ClaveTipoCuenta { get; set; }

        public string? DescripcionTipoCuenta { get; set; }

        #endregion Properties
    }
}