namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Constants
{
    /// <summary>
    /// Class with common constanst
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/02/2025
    public static class CommonConstants
    {
        /// <summary>
        /// Constants of return codes
        /// </summary>
        public struct ReturnCodeConsts
        {
            public const short SUCCESS_CODE = 0;
            public const short GENERIC_ERROR_CODE = 999;

            public const string SUCCESS_MESSAGE = "PROCESO EJECUTADO CORRECTAMENTE";
            public const string ERROR_MESSAGE = "ERROR AL EJECUTAR EL PROCESO";

            public const string USER_SUCCESS_MESSAGE = "El proceso se realizó de manera correcta.";
            public const string USER_ERROR_MESSAGE = "Ocurrió un error al realizar el proceso.";
        }

        /// <summary>
        /// Status request
        /// </summary>
        public struct StatusRequest
        {
            public const short ID_PENDIENTE_AUTORIZAR = 2;
            public const short ID_AUTORIZADA = 3;
        }
    }
}