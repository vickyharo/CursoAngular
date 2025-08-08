using Bansi.CredPC.ModificaCredito.Service.Modelo.Service;
using System.Text;

namespace Bansi.CredPC.ModificaCredito.Service.Negocio.Helpers
{
    /// <summary>
    /// Class with common or generic methods
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo
    internal static class CommonHelper
    {
        /// <summary>
        /// Genera el detalle de solicitud para registrar en BD
        /// </summary>
        /// <param name="detalleSolicitud"></param>
        /// <returns></returns>
        public static string GenerarDetalleSolicitudCambioCuenta(List<DetalleSolicitudCambioCuenta> detalleSolicitud)
        {
            if (detalleSolicitud.Count == decimal.Zero) throw new ArgumentException("No se especificó el detalle de la solicitud");

            string delimitadorRegistro = ParameterHelperBdiCred.GetParameter<string>(Constants.CommonConstants.NombresParametros.DELIMITADOR_REGISTRO).Trim();
            string delimitadorCampo = ParameterHelperBdiCred.GetParameter<string>(Constants.CommonConstants.NombresParametros.DELIMITADOR_CAMPOS).Trim();

            StringBuilder resultado = new StringBuilder();

            string registroDetalle;

            foreach (DetalleSolicitudCambioCuenta detalle in detalleSolicitud)
            {
                registroDetalle = string.Join(delimitadorCampo,
                    detalle.Clavenaturaleza.ValueOrEmpty().Trim(),
                    detalle.Clavetipocuenta.ValueOrEmpty().Trim(),
                    detalle.Cuentaoriginal.ValueOrEmpty().Trim(),
                    detalle.Cuentanueva.ValueOrEmpty().Trim());

                //AL FINAL SE CONCATENA EL DELIMITADOR DE CAMPO, POR COMO SE DELIMITA EL STRING EN BD
                registroDetalle += delimitadorCampo;

                resultado.Append($"{registroDetalle}{delimitadorRegistro}");
            }

            return resultado.ToString();
        }

        /// <summary>
        /// Genera el detalle de solicitud de cambio de línea para registrar en BD
        /// </summary>
        /// <param name="detalle"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public static string GenerarDetalleSolicitudCambioLinea(DetalleSolicitudCambioLinea detalle)
        {
            if (detalle.MontoOriginal == 0 && detalle.MontoNuevo == 0) throw new ArgumentException("No se especificó el detalle de la solicitud");

            string delimitadorRegistro = ParameterHelperBdiCred.GetParameter<string>(Constants.CommonConstants.NombresParametros.DELIMITADOR_REGISTRO).Trim();
            string delimitadorCampo = ParameterHelperBdiCred.GetParameter<string>(Constants.CommonConstants.NombresParametros.DELIMITADOR_CAMPOS).Trim();

            StringBuilder resultado = new StringBuilder();

            string registroDetalle;

            registroDetalle = string.Join(delimitadorCampo,
                detalle.MontoOriginal.ToString().Trim(),
                detalle.MontoNuevo.ToString().Trim());

            //AL FINAL SE CONCATENA EL DELIMITADOR DE CAMPO, POR COMO SE DELIMITA EL STRING EN BD
            registroDetalle += delimitadorCampo;

            resultado.Append($"{registroDetalle}{delimitadorRegistro}");

            return resultado.ToString();
        }
    }
}