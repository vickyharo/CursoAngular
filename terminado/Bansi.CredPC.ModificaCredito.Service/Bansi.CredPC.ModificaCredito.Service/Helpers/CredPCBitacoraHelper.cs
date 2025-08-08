using Bansi.CredPC.Bitacora;
using System.Reflection;

namespace Bansi.CredPC.ModificaCredito.Service.Helpers
{
    internal class CredPCBitacoraHelper
    {
        internal const short IdTipoComponenteAtrasos = (short)TiposComponente.EXECUTABLE;

        /// <summary>
        /// Genera el bitácora Core para este módulo
        /// </summary>
        /// <param name="concepto"></param>
        /// <returns></returns>
        private static BitacoraCore GenerarBitacoraCore(string _usuario, string _concepto)
        {
            Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase.BDICredQueries query = new Datos.Persistence.BdiCredDatabase.BDICredQueries();
            Int16 idModulo = short.Parse(query.spObtenerParametro("IDBITMODIFCREDITO"));
            BitacoraCore bitacoraCore = new BitacoraCore(idModulo, _usuario, _concepto);
            return bitacoraCore;
        }

        /// <summary>
        /// Nombre del ejecutable
        /// </summary>
        /// <returns></returns>
        internal static string NombreComponente()
        {
            string name = string.Empty;
            name = Assembly.GetExecutingAssembly().GetName().ToString();
            return name;
        }

        /// <summary>
        /// Genera la Bitácora Técnica
        /// </summary>
        /// <param name="concepto"></param>
        /// <returns>bitacoraTecnica</returns>
        /// <remarks>
        /// Creación:BALFARO 12/02/2021
        /// </remarks>
        internal static BitacoraTecnica GenerarBitacoraTecnica(string _usuario, string _concepto)
        {
            BitacoraTecnica bitacoraTecnica = new BitacoraTecnica(GenerarBitacoraCore(_usuario, _concepto), IdTipoComponenteAtrasos, NombreComponente());
            return bitacoraTecnica;
        }

        /// <summary>
        /// Genera La Bitácora Operativa
        /// </summary>
        /// <param name="concepto"></param>
        /// <param name="success"></param>
        /// <param name="creditoCastigadoR"></param>
        /// <returns>BitacoraOperativa </returns>
        /// <remarks>
        /// Creación:BALFARO 12/02/2021
        /// </remarks>
        internal static BitacoraOperativa GenerarBitacoraOperativa(string _usuario, string _concepto, bool _success)
        {
            BitacoraCore bitCore = GenerarBitacoraCore(_usuario, _concepto);
            BitacoraOperativa bitacoraOperativa = new BitacoraOperativa(bitCore, _success);
            return bitacoraOperativa;
        }
    }
}