namespace Bansi.CredPC.ModificaCredito.Service.Constants
{
    /// <summary>
    /// Class with system constants
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 17/02/2025
    internal class CommonConstants
    {
        /// <summary>
        /// Service consts
        /// </summary>
        public struct ServiceConst
        {
            public const string ServiceGUID = "BE9DC4EF-7FE6-4771-BF7A-E9E0CB9E5A37";
        }

        public struct TipoSolicitudConst
        {
            public const int SOLICITUD_CAMBIO_CUENTA = 1;
            public const int SOLICITUD_CAMBIO_LINEA = 2;
        }
    }
}