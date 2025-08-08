using Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Service
{
    /// <summary>
    /// Class to model clients information
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 23/12/2024
    public class Cliente : ICliente
    {
        #region ICliente

        public string? NumeroCliente { get; set; }

        public string? NombreCliente { get; set; }

        public string? EstatusCte { get; set; }

        public string? Rfc { get; set; }

        public string? TipoPersona { get; set; }

        public string? TipoCliente { get; set; }

        #endregion ICliente

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="numeroCliente"></param>
        /// <param name="nombreCliente"></param>
        /// <param name="estatusCte"></param>
        /// <param name="rfc"></param>
        /// <param name="tipoPersona"></param>
        /// <param name="tipoCliente"></param>
        public Cliente(string numeroCliente, string nombreCliente, string estatusCte, string rfc, string tipoPersona, string tipoCliente)
        {
            NumeroCliente = numeroCliente;
            NombreCliente = nombreCliente;
            EstatusCte = estatusCte;
            Rfc = rfc;
            TipoPersona = tipoPersona;
            TipoCliente = tipoCliente;
        }

        #endregion Constructor
    }
}