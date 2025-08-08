namespace Bansi.CredPC.ModificaCredito.Service.Negocio.Constants
{
    /// <summary>
    /// Class with common constants
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 29/05/2023
    internal static class CommonConstants
    {
        /// <summary>
        /// GUID de la aplicacion
        /// </summary>
        internal static string GUID = "BF35173B-4D1A-4311-A648-9B515F1FA800";

        /// <summary>
        /// Constantes de nombres de parametros
        /// </summary>
        internal struct NombresParametros
        {
            public static string DELIMITADOR_REGISTRO = "DELIMITADOR_REGISTRO";
            public static string DELIMITADOR_CAMPOS = "DELIMITADOR_CAMPOS";
        }

        public struct TipoSolicitudConst
        {
            public const int SOLICITUD_CAMBIO_CUENTA = 1;
            public const int SOLICITUD_CAMBIO_LINEA = 2;
        }
    }
}