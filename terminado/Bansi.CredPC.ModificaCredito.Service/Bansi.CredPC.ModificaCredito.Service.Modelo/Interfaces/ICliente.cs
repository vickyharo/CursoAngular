namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with customer properties to implement
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public interface ICliente
    {
        public string? NumeroCliente { get; set; }

        public string? NombreCliente { get; set; }

        public string? EstatusCte { get; set; }

        public string? Rfc { get; set; }

        public string? TipoPersona { get; set; }

        public string? TipoCliente { get; set; }
    }
}