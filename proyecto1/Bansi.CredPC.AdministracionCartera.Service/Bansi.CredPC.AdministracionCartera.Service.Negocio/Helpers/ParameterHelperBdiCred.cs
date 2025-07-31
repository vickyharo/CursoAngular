using Bansi.CredPC.AdministracionCartera.Service.Negocio.Constants;
using Bansi.Runtime.Caching;

namespace Bansi.CredPC.AdministracionCartera.Service.Negocio.Helpers
{
    /// <summary>
    /// Clase para la obtencion de parametros del sistema
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 11/06/2024
    public static class ParameterHelperBdiCred
    {
        #region Constantes

        private const string KEY_CHACHE_PARAMS = "ParametrosBansiCredPCAdministracionCarteraSecurity.GetParameters()";

        #endregion Constantes

        #region MEtodos publicos

        /// <summary>
        /// Obtiene un parámetro en particular, si no existe emergerá una excepción.
        /// </summary>
        /// <param name="parameterName">Nombre del parámetro.</param>
        /// <param name="useCache">Indica si debemos usar cache.</param>
        /// <returns></returns>
        public static T GetParameter<T>(string parameterName, bool useCache = true)
        {
            if (!useCache)
            {
                return (T)Convert.ChangeType(new Datos.Persistence.BdiCredDatabase.BDICredQueries().spObtenerParametro(parameterName), typeof(T));
            }

            string valorParametro;

            Dictionary<string, string> parametrosCache = GetParametersCache();

            if (parametrosCache.ContainsKey(parameterName))
            {
                valorParametro = parametrosCache[parameterName];
            }
            else
            {
                valorParametro = new Datos.Persistence.BdiCredDatabase.BDICredQueries().spObtenerParametro(parameterName);

                if (StringHelper.IsNullOrEmpty(valorParametro)) throw new UnexpectedNullOrEmptyReturnException($"No se encontró el valor del parámetro '{parameterName}' en la tabla de parámetros del sistema.");

                parametrosCache.Add(parameterName, valorParametro);
                SetParametersCache(parametrosCache);
            }

            return (T)Convert.ChangeType(valorParametro, typeof(T));
        }

        #endregion MEtodos publicos

        #region Metodos privados

        /// <summary>
        /// Obtiene los parametros en cache
        /// </summary>
        /// <returns></returns>
        private static Dictionary<string, string> GetParametersCache()
        {
            Dictionary<string, string> resultado = (Dictionary<string, string>)CacheHelper.GetElement(CommonConstants.GUID, KEY_CHACHE_PARAMS);

            return (resultado == null) ?
                new Dictionary<string, string>() :
                resultado;
        }

        /// <summary>
        /// Guarda los parametros en cache
        /// </summary>
        /// <param name="parametros"></param>
        private static void SetParametersCache(Dictionary<string, string> parametros)
        {
            CacheHelper.SetElement(parametros, CommonConstants.GUID, KEY_CHACHE_PARAMS);
        }

        #endregion Metodos privados
    }
}