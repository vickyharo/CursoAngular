using System.Data;

namespace Bansi.CredPC.AdministracionCartera.Service.Datos.Extensions
{
    /// <summary>
    /// Clase con metodos de extension
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo
    internal static class DataRowExtension
    {
        /// <summary>
        /// Obtiene el valor de un campo del DataRow, si el valor es NULL retorna el valor por defecto para el tipo de dato
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="row">DataRow a obtener valores</param>
        /// <param name="nombreColumna">Nombre de columna a obtener</param>
        /// <returns></returns>
        public static T FieldOrDefault<T>(this DataRow row, string nombreColumna)
        {
            if (row == null) throw new ArgumentNullException(nameof(row), "El valor del parametro no es valido");

            if (typeof(T) == typeof(bool))
            {
                return (row.IsNull(nombreColumna) ? default : (T)(object)Convert.ToBoolean(row[nombreColumna]))
                    ?? throw new ArgumentNullException($"Cannot get field value '{nombreColumna}' from DataRow");
            }

            return (row.IsNull(nombreColumna) ? default : row.Field<T>(nombreColumna))
                ?? throw new ArgumentNullException($"Cannot get field value '{nombreColumna}' from DataRow");
        }
    }
}