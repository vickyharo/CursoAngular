using Bansi.CredPC.ModificaCredito.Service.Datos.Extensions;
using Bansi.CredPC.ModificaCredito.Service.Modelo.Service;
using Bansi.Data;
using System.Data;
using System.Data.Common;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase para ejecucin de consultas SQL a la base de datos
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/06/2024
    public class BDICredQueries
    {

        #region Metodos

        #region ModificacionCuenta

        /// <summary>
        /// Ejecucion de stored para el registor de solicitud de cambio de cuenta
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <param name="usuarioSolicita"></param>
        /// <param name="comentarios"></param>
        /// <param name="detalle"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <exception cref="ReturnCodeException"></exception>
        public ReturnCodeInformation<int> spRegistroSolicitudModificacion(string numeroCredito, int idTipoSolicitud, string usuarioSolicita, int idEstatus, string comentarios)
        {
            using DbCommand comando = DatabaseHelper.BDICred.GetStoredProcCommand("spRegistroSolicitudModificacion");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(comando, "pNumeroCredito", DbType.String, numeroCredito);
                DatabaseHelper.BDICred.AddInParameter(comando, "pTipoSolicitud", DbType.Int32, idTipoSolicitud);
                DatabaseHelper.BDICred.AddInParameter(comando, "pUsuarioSolicita", DbType.String, usuarioSolicita);
                DatabaseHelper.BDICred.AddInParameter(comando, "pComentarios", DbType.String, comentarios);
                DatabaseHelper.BDICred.AddInParameter(comando, "pEstatusSolicitud", DbType.Int32, idEstatus);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(comando) ?? throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spRegistroSolicitudModificacion)}");

                ReturnCodeInformation<int> returnCode = new ReturnCodeInformation<int>(row.Field<int>("CodigoRetorno"), row.Field<string>("MensajeRetorno"));
                if (returnCode.Failure) throw new ReturnCodeException(returnCode);

                returnCode.ResultItem = row.Field<int>("IdSolicitudRegistrada");

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

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
        /// Ejecucion de stored para cancelacion de solicitud
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <exception cref="ReturnCodeException"></exception>
        public ReturnCodeInformation spCancelarSolicitudCambioCuenta(int idSolicitud, string usuario, string comentarios)
        {
            using DbCommand comando = DatabaseHelper.BDICred.GetStoredProcCommand("spCancelarSolicitudCambioCuenta");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(comando, "pIdsolicitud", DbType.Int32, idSolicitud);
                DatabaseHelper.BDICred.AddInParameter(comando, "pUsuario", DbType.String, usuario);
                DatabaseHelper.BDICred.AddInParameter(comando, "pComentario", DbType.String, comentarios);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(comando) ?? throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spCancelarSolicitudCambioCuenta)}");

                return new ReturnCodeInformation(row.Field<int>("CodigoRetorno"), row.Field<string>("MensajeRetorno"));
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }


        /// <summary>
        /// Ejecucion de stored para autorizacion de solicitud
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <exception cref="ReturnCodeException"></exception>
        public ReturnCodeInformation spAutorizarSolicitudCambioCuenta(int idSolicitud, string usuario, string comentarios)
        {
            using DbCommand comando = DatabaseHelper.BDICred.GetStoredProcCommand("spAutorizarSolicitudCambioCuenta");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(comando, "pIdSolicitud", DbType.Int32, idSolicitud);
                DatabaseHelper.BDICred.AddInParameter(comando, "pUsuario", DbType.String, usuario);
                DatabaseHelper.BDICred.AddInParameter(comando, "pComentario", DbType.String, comentarios);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(comando) ?? throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spAutorizarSolicitudCambioCuenta)}");

                return new ReturnCodeInformation(row.Field<int>("CodigoRetorno"), row.Field<string>("MensajeRetorno"));
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Ejecucion de stored para aplicacion de solicitud
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <exception cref="ReturnCodeException"></exception>
        public ReturnCodeInformation spAplicarSolicitudCambioCuenta(int idSolicitud, string usuario, string comentarios)
        {
            using DbCommand comando = DatabaseHelper.BDICred.GetStoredProcCommand("spAplicarSolicitudCambioCuenta");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(comando, "pIdSolicitud", DbType.Int32, idSolicitud);
                DatabaseHelper.BDICred.AddInParameter(comando, "pUsuario", DbType.String, usuario);
                DatabaseHelper.BDICred.AddInParameter(comando, "pComentario", DbType.String, comentarios);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(comando) ?? throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spAplicarSolicitudCambioCuenta)}");

                return new ReturnCodeInformation(row.Field<int>("CodigoRetorno"), row.Field<string>("MensajeRetorno"));
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Executes stored procedure to get cliente information
        /// </summary>
        /// <param name="numeroCliente"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        public ReturnCodeInformation<Cliente> spConsultarInformacionCliente(string numeroCliente)
        {
            using DbCommand comando = DatabaseHelper.BDICred.GetStoredProcCommand("spConsultarInformacionCliente");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(comando, "pNumeroCliente", DbType.String, numeroCliente);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(comando) ?? throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spConsultarInformacionCliente)}");               

                ReturnCodeInformation<Cliente> returnCode = new ReturnCodeInformation<Cliente>()
                {
                    Code = row.Field<int>("CodigoRetorno").ToString(),
                    Message = row.Field<string>("DescripcionRetorno"),
                };

                if (returnCode.Success)
                {
                    returnCode.ResultItem = new Cliente
                        (
                            row.FieldOrDefault<string>("NumeroCliente"),
                            row.FieldOrDefault<string>("NombreCliente"),
                            row.FieldOrDefault<string>("EstatusCte"),
                            row.FieldOrDefault<string>("Rfc"),
                            row.FieldOrDefault<string>("TipoPersona"),
                            row.FieldOrDefault<string>("TipoCliente")
                        );
                }

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Execute stored procedure
        /// </summary>
        /// <param name="numeroCuenta"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        public ReturnCodeInformation<Cuenta> spConsultarInformacionCuenta(string numeroCuenta)
        {
            using DbCommand comando = DatabaseHelper.BDICred.GetStoredProcCommand("spConsultarInformacionCuenta");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(comando, "pNumeroCuenta", DbType.String, numeroCuenta);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(comando) ?? throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spConsultarInformacionCuenta)}");

                ReturnCodeInformation<Cuenta> returnCode = new ReturnCodeInformation<Cuenta>()
                {
                    Code = row.Field<int>("CodigoRetorno").ToString(),
                    Message = row.Field<string>("DescripcionError"),
                };

                if (returnCode.Success)
                {
                    returnCode.ResultItem = new Cuenta(
                            row.FieldOrDefault<string>("numeroCuenta"),
                            row.FieldOrDefault<string>("tipoCuenta"),
                            row.FieldOrDefault<string>("numeroCliente"),
                            row.FieldOrDefault<string>("nombreCliente"),
                            row.FieldOrDefault<string>("tipoPersonaCte"),
                            row.FieldOrDefault<string>("tipoCliente"),
                            row.FieldOrDefault<string>("estatusCte"),
                            row.FieldOrDefault<string>("codigoDivisa"),
                            row.FieldOrDefault<string>("divisa"),
                            row.FieldOrDefault<string>("producto")
                        );
                }

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Realiza la inserción del detalle del cambio de cuenta
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <param name="claveNaturaleza"></param>
        /// <param name="tipoCuenta"></param>
        /// <param name="cuentaOriginal"></param>
        /// <param name="cuentaNueva"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        public ReturnCodeInformation spRegistroDetalleCambioCuenta(int idSolicitud, string claveNaturaleza, string tipoCuenta, string cuentaOriginal, string cuentaNueva)
        {
            using DbCommand command = DatabaseHelper.BDICred.GetStoredProcCommand("spRegistroDetalleCambioCuenta");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(command, "pIdSolicitud", DbType.Int32, idSolicitud);
                DatabaseHelper.BDICred.AddInParameter(command, "pClaveNaturaleza", DbType.String, claveNaturaleza);
                DatabaseHelper.BDICred.AddInParameter(command, "pClaveTipoCuenta", DbType.String, tipoCuenta);
                DatabaseHelper.BDICred.AddInParameter(command, "pCuentaOriginal", DbType.String, cuentaOriginal);
                DatabaseHelper.BDICred.AddInParameter(command, "pCuentaNueva", DbType.String, cuentaNueva);


                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(command) ??
                    throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spRegistroDetalleCambioCuenta)}");

                ReturnCodeInformation returnCode = new ReturnCodeInformation()
                {
                    Code = row.Field<int>("CodigoRetorno").ToString(),
                    Message = row.Field<string>("MensajeRetorno")
                };

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        #endregion ModificacionCuenta

        #region ModificacionLinea

        /// <summary>
        /// Consulta la información de una línea
        /// </summary>
        /// <param name="numeroLinea"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public ReturnCodeInformation<List<Linea>> spConsultarInformacionLinea(string numeroLinea)
        {
            using DbCommand command = DatabaseHelper.BDICred.GetStoredProcCommand("spConsultarInformacionLinea");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(command, "pNumeroLinea", DbType.String, numeroLinea);

                DataTable table = DatabaseHelper.BDICred.ExecuteDataTable(command) ??
                    throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spConsultarInformacionLinea)}");

                ReturnCodeInformation<List<Linea>> returnCode = new ReturnCodeInformation<List<Linea>>();

                if (table.Rows.Count > 0)
                {
                    returnCode = new ReturnCodeInformation<List<Linea>>()
                    {
                        Code = table.Rows[0].Field<int>("CodigoRetorno").ToString(),
                        Message = table.Rows[0].Field<string>("DescripcionError"),
                    };
                }
                else
                {
                    throw new ReturnCodeException(new ReturnCodeInformation("999", "No se encontró ninguna coincidencia de línea activa"));
                }

                List<Linea> lineas = new List<Linea>();

                foreach (DataRow row in table.Rows)
                {
                    Linea linea = new Linea(
                        row.FieldOrDefault<string>("numerolinea"),
                        row.FieldOrDefault<string>("codproducto"),
                        row.FieldOrDefault<string>("producto"),
                        row.FieldOrDefault<string>("numerocliente"),
                        row.FieldOrDefault<string>("nombrecliente"),
                        row.FieldOrDefault<string>("divisa"),
                        row.FieldOrDefault<string>("descripciondivisa"),
                        row.FieldOrDefault<string>("numeroejecutivo"),
                        row.FieldOrDefault<string>("nombreejecutivo"),
                        row.FieldOrDefault<string>("codsucursal"),
                        row.FieldOrDefault<string>("nombresucursal"),
                        row.FieldOrDefault<Decimal>("montoautorizado"),
                        row.FieldOrDefault<Decimal>("montoutilizado"),
                        row.FieldOrDefault<DateTime>("fechaalta"),
                        row.FieldOrDefault<DateTime>("fechavencimiento"),
                        row.FieldOrDefault<DateTime>("fechaautorizacionlinea"),
                        row.FieldOrDefault<int>("plazodias"),
                        row.FieldOrDefault<string>("estatuslinea"),
                        row.FieldOrDefault<string>("descestatuslinea")
                        );
                    lineas.Add(linea);
                }

                returnCode.ResultItem = lineas;

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Realiza una validación del monto nuevo de la línea
        /// </summary>
        /// <param name="numeroLinea"></param>
        /// <param name="montoNuevo"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        public ReturnCodeInformation spValidarCambioMontoLinea(string numeroLinea, decimal montoNuevo)
        {
            using DbCommand command = DatabaseHelper.BDICred.GetStoredProcCommand("spValidarCambioMontoLinea");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(command, "pNumeroLinea", DbType.String, numeroLinea);
                DatabaseHelper.BDICred.AddInParameter(command, "pMontoNuevo", DbType.Decimal, montoNuevo);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(command) ??
                    throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spValidarCambioMontoLinea)}");

                ReturnCodeInformation returnCode = new ReturnCodeInformation()
                {
                    Code = row.Field<int>("CodigoRetorno").ToString(),
                    Message = row.Field<string>("MensajeRetorno")
                };

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Realiza la inserción del detalle en cambio de línea
        /// </summary>
        /// <param name="idSolicitud"></param>
        /// <param name="montoOriginal"></param>
        /// <param name="montoNuevo"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        public ReturnCodeInformation spRegistroDetalleCambioLinea(int idSolicitud, decimal montoOriginal, decimal montoNuevo)
        {
            using DbCommand command = DatabaseHelper.BDICred.GetStoredProcCommand("spRegistroDetalleCambioLinea");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(command, "pIdSolicitud", DbType.Int32, idSolicitud);
                DatabaseHelper.BDICred.AddInParameter(command, "pMontoOriginal", DbType.Decimal, montoOriginal);
                DatabaseHelper.BDICred.AddInParameter(command, "pMontoNuevo", DbType.Decimal, montoNuevo);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(command) ??
                    throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(spRegistroDetalleCambioLinea)}");

                ReturnCodeInformation returnCode = new ReturnCodeInformation()
                {
                    Code = row.Field<int>("CodigoRetorno").ToString(),
                    Message = row.Field<string>("MensajeRetorno")
                };

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Valida si una cuenta permite abonos
        /// </summary>
        /// <param name="numeroCuenta"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        public ReturnCodeInformation fnCuentaPermiteTransaccionesAbono(string numeroCuenta)
        {
            using DbCommand command = DatabaseHelper.BDICred.GetStoredProcCommand("fnCuentaPermiteTransaccionesAbono");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(command, "pNumeroCuenta", DbType.String, numeroCuenta);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(command) ??
                    throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(fnCuentaPermiteTransaccionesAbono)}");

                ReturnCodeInformation returnCode = new ReturnCodeInformation()
                {
                    Code = row.Field<int>("CodigoRetorno").ToString(),
                    Message = row.Field<string>("DescripcionError")
                };

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Valida si una cuenta permite cargos
        /// </summary>
        /// <param name="numeroCuenta"></param>
        /// <param name="numeroCredito"></param>
        /// <param name="producto"></param>
        /// <returns></returns>
        /// <exception cref="UnexpectedNullOrEmptyReturnException"></exception>
        public ReturnCodeInformation fnCuentaPermiteTransaccionesCargo(string numeroCuenta, string numeroCredito, string producto)
        {
            using DbCommand command = DatabaseHelper.BDICred.GetStoredProcCommand("fnCuentaPermiteTransaccionesCargo");
            try
            {
                DatabaseHelper.BDICred.AddInParameter(command, "pNumeroCuenta", DbType.String, numeroCuenta);
                DatabaseHelper.BDICred.AddInParameter(command, "pNumeroCredito", DbType.String, numeroCredito);
                DatabaseHelper.BDICred.AddInParameter(command, "pProducto", DbType.String, producto);

                DataRow row = DatabaseHelper.BDICred.ExecuteDataRow(command) ??
                    throw new UnexpectedNullOrEmptyReturnException($"Se obtuvo un valor NULO cuando no se esperaba al ejecutar {nameof(fnCuentaPermiteTransaccionesCargo)}");

                ReturnCodeInformation returnCode = new ReturnCodeInformation()
                {
                    Code = row.Field<int>("CodigoRetorno").ToString(),
                    Message = row.Field<string>("DescripcionError")
                };

                return returnCode;
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        #endregion ModificacionLinea

        #region Security

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

        #endregion Metodos

    }
}
