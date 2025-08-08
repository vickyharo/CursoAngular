using Newtonsoft.Json;

namespace Bansi.CredPC.ModificaCredito.Service.Negocio.Helpers
{
    /// <summary>
    /// Class to cast between objects types
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo
    public static class ObjectConverterHelper
    {
        /// <summary>
        /// Casting abject to another
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="from"></param>
        /// <returns></returns>
        /// <exception cref="InvalidCastException"></exception>
        public static T CastObjectTo<T>(object from)
        {
            string serializedObject = JsonConvert.SerializeObject(from);

            return JsonConvert.DeserializeObject<T>(serializedObject) ??
                throw new InvalidCastException($"Can't cast object type '{from.GetType().FullName}' to the type '{typeof(T).FullName}'");
        }
    }
}