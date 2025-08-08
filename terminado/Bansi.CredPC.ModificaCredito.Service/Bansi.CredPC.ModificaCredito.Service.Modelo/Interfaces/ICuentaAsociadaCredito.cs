namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with accounts associated to credit
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public interface ICuentaAsociadaCredito : ICuenta
    {
        #region Properties

        public string? NumeroCredito { get; set; }

        public string CodTipoCuenta { get; set; }

        public string CodNaturaleza { get; set; }

        public string Naturaleza { get; set; }

        public string AplicacionCuenta { get; set; }

        public string? EsProductoChequesCredito { get; set; }

        #endregion Properties
    }
}