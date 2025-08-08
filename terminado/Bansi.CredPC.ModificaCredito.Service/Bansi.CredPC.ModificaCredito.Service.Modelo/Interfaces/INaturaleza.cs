namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with nature properites
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public interface INaturaleza
    {
        #region Properties

        public string? ClaveNaturaleza { get; set; }

        public string? DescripcionNaturaleza { get; set; }

        #endregion Properties
    }
}