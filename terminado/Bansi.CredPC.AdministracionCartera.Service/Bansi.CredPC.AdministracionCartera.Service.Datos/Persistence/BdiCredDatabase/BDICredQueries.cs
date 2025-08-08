using Bansi.CredPC.AdministracionCartera.Service.Datos.Extensions;
using Bansi.CredPC.AdministracionCartera.Service.Modelo.Service;
using Bansi.Data;
using System.Data;
using System.Data.Common;

namespace Bansi.CredPC.AdministracionCartera.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase para ejecucin de consultas SQL a la base de datos
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/06/2024
    public class BDICredQueries
    {
        #region Security

        /// <summary>
        /// Ejecucion de stored para la obtencion de parametros
        /// </summary>
        /// <param name="claveParametro"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <exception cref="ReturnCodeException"></exception>
        public string spObtenerParametro(string claveParametro)
        {
            using DbCommand comando = DatabaseHelper.BDICred.GetStoredProcCommand("spObtenerParametro");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(comando, "claveParametro", DbType.String, claveParametro);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(comando) ?? throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spObtenerParametro)}");

                ReturnCodeInformation returnCode = new ReturnCodeInformation();

                if (ReturnCodeInformation.IsFailure(row.Field<string>("codigoRetorno")))
                {
                    throw new ReturnCodeException(new ReturnCodeInformation(row.Field<string>("codigoRetorno"), "Error al obtener parametro del sistema"));
                }

                return row.FieldOrDefault<string>("valorParametro");
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Obtiene las fechas de CredPC
        /// </summary>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        public ReturnCodeInformation<Fechas> spObtenFechasCredPC()
        {
            using DbCommand command = DatabaseHelper.BDICred.GetStoredProcCommand("spobtenfechascredpc");
            try
            {
                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(command) ?? throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spObtenFechasCredPC)}");

                ReturnCodeInformation<Fechas> returnCode = new ReturnCodeInformation<Fechas>()
                {
                    Code = row.Field<string>("CodigoRetorno"),
                    Message = row.Field<string>("VarDataErr"),
                };

                if (returnCode.Success)
                    returnCode.ResultItem = new Fechas(
                            row.FieldOrDefault<DateTime>("fechahoy"),
                            row.FieldOrDefault<DateTime>("fechaant"),
                            row.FieldOrDefault<DateTime>("proxfecha"),
                            row.FieldOrDefault<DateTime>("pridianaturalmes"),
                            row.FieldOrDefault<DateTime>("pridiahabilmes"),
                            row.FieldOrDefault<DateTime>("ultdianaturalmes"),
                            row.FieldOrDefault<DateTime>("ultdiahabilmes")
                        );

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        #endregion Security
    }
}