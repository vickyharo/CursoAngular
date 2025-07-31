namespace Bansi.CredPC.AdministracionCartera.Service.Constants
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

        /// <summary>
        /// JWT constants
        /// </summary>
        public struct JwtConfigConst
        {
            public const string ClaimSeparator = "/";
            public const string SectionName = "JwtConfig";
            public const string SecretKeyPropertieName = "Secret";
            public const string Issuer = "Issuer";
            public const string Audience = "Audience";
            public const string ClaimSession = "Session";
            public const string ClaimUserName = "UserName";
            public const string ClaimAppName = "AppName";
        }

        /// <summary>
        /// Params name to get from BDICRED
        /// </summary>
        public struct ParameterNames
        {
            public const string TIEMPO_EXPIRACION_TOKEN = "TIMEEXPIRACIONTOKEN";
            public const string LLAVE_GENERACION_TOKEN = "KEYGENERACIONTOKEN";
        }
    }
}