using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    public class CuentaAsociadaCredito : ICuentaAsociadaCredito
    {
        public string? NumeroCredito { get; set; }

        public string? CodTipoCuenta { get; set; }

        public string? CodNaturaleza { get; set; }

        public string? Naturaleza { get; set; }

        public string? AplicacionCuenta { get; set; }

        public string? EsProductoChequesCredito { get; set; }

        public string? CuentaCheques { get; set; }

        public string? NumeroCliente { get; set; }

        public string? CodDivisa { get; set; }

        public string? Divisa { get; set; }

        public string? TipoCuenta { get; set; }

        public string? Producto { get; set; }
        public string? NombreCliente { get; set; }
    }
}