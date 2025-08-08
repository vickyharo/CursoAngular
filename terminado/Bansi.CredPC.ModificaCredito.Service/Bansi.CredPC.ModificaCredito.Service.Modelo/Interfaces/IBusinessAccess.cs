using Bansi.CredPC.ModificaCredito.Service.Modelo.Service;

namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with methods to implements
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo
    public interface IBusinessAccess
    {
        #region ModificacionCuenta

        /// <summary>
        /// Consulta de solicitudes
        /// </summary>
        /// <param name="idEstatus"></param>
        /// <param name="numeroCredito"></param>
        /// <param name="fechaInicio"></param>
        /// <param name="fechaFin"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<SolicitudCambioCuenta>> ConsultarsolicitudesCambioCuenta(int idEstatus, int idTipoSolicitud, string numeroCredito, DateTime fechaInicio, DateTime fechaFin);

        /// <summary>
        /// Metodo para el registro de solicitud de cambio de cuenta
        /// </summary>
        /// <param name="reqSolcitud"></param>
        /// <returns></returns>
        public ReturnCodeInformation<int> RegistrarSolicitudCambioCuenta(Service.ServiceRequests.RegistrarSolicitudRequest reqSolcitud);

        /// <summary>
        /// Realiza la cancelacion de una solicitud
        /// </summary>
        /// <param name="reqCancelacion"></param>
        /// <returns></returns>
        public ReturnCodeInformation CancelarSolicitudCambioCuenta(Service.ServiceRequests.ProcesarSolicitudRequest reqCancelacion);

        /// <summary>
        /// Realiza la autorizacion de una solicitud
        /// </summary>
        /// <param name="reqAutorizacion"></param>
        /// <returns></returns>
        public ReturnCodeInformation AutorizarSolicitudCambioCuenta(Service.ServiceRequests.ProcesarSolicitudRequest reqAutorizacion);

        /// <summary>
        /// Realiza la autorizacion de una solicitud
        /// </summary>
        /// <param name="reqAplicacion"></param>
        /// <returns></returns>
        public ReturnCodeInformation AplicarSolicitudCambioCuenta(Service.ServiceRequests.ProcesarSolicitudRequest reqAplicacion);
        
        /// <summary>
        /// Obtiene los estatus de solicitud de cambio de cuenta
        /// </summary>
        /// <returns></returns>
        public ReturnCodeInformation<List<EstatusSolicitudCambioCuenta>> ObtenerEstatusSolicitudCambioCuenta();

        /// <summary>
        /// Obtiene las naturalezas
        /// </summary>
        /// <returns></returns>
        public ReturnCodeInformation<List<Naturaleza>> ObtenerNaturalezas();

        /// <summary>
        /// Obtiene los tipos de cuentas
        /// </summary>
        /// <returns></returns>
        public ReturnCodeInformation<List<TipoCuenta>> ObtenerTiposCuentas();

        /// <summary>
        /// Consulta de Creditos
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<CreditoMinistrado>> ConsultarInformacionCredito(string numeroCredito);

        /// <summary>
        /// Consulta de cuentas de creditos
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<CuentaAsociadaCredito>> ConsultarCuentasCredito(string numeroCredito);

        /// <summary>
        /// Gets Cliente information
        /// </summary>
        /// <param name="numeroCliente"></param>
        /// <returns></returns>
        public ReturnCodeInformation<Cliente> ConsultarInformacionCliente(string numeroCliente);

        /// <summary>
        /// Gets account information
        /// </summary>
        /// <param name="numeroCuenta"></param>
        /// <returns></returns>
        public ReturnCodeInformation<Cuenta> ConsultarInformacionCuenta(string numeroCuenta);

        /// <summary>
        /// Check if exists any request pending by credit
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <returns></returns>
        public bool ExistenSolicitudesPendientesAutorizar(string numeroCredito, int tipoSolicitud);

        #endregion ModificacionCuenta

        #region ModificacionLinea

        /// <summary>
        /// Consulta la información de una línea
        /// </summary>
        /// <param name="numeroLinea"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public ReturnCodeInformation<List<Linea>> ConsultarInformacionLinea(string numeroLinea);

        /// <summary>
        /// Método para la consulta de solicitudes de cambio de línea
        /// </summary>
        /// <param name="idEstatus"></param>
        /// <param name="numeroLinea"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<SolicitudCambioLinea>> ConsultarSolicitudesCambioLinea
            (int idEstatus, string numeroLinea, DateTime _fechaRegistroInicio, DateTime _fechaRegistroFin);

        /// <summary>
        /// Registra una solicitud de cambio de linea
        /// </summary>
        /// <param name="reqSolcitud"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 21/03/2025</remarks>
        public ReturnCodeInformation<int> RegistrarSolicitudCambioLinea(Service.ServiceRequests.RegistrarSolicitudRequest reqSolcitud);

        /// <summary>
        /// Cancela solicitud del cambio de línea
        /// </summary>
        /// <param name="reqCancelacion"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        public ReturnCodeInformation CancelarSolicitudCambioLinea(Service.ServiceRequests.ProcesarSolicitudRequest reqCancelacion);

        /// <summary>
        /// Autoriza solicitud del cambio de línea
        /// </summary>
        /// <param name="reqAutorizacion"></param>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 24/03/2025</remarks>
        public ReturnCodeInformation AutorizarSolicitudCambioLinea(Service.ServiceRequests.ProcesarSolicitudRequest reqAutorizacion);

        /// <summary>
        /// Aplicar la solicitud del cambio de monto de línea
        /// </summary>
        /// <param name="reqAplicacion"></param>
        /// <returns></returns>
        /// <remarks>Victoria Haro 08/07/2025</remarks>
        public ReturnCodeInformation AplicarSolicitudCambioLinea(Service.ServiceRequests.ProcesarSolicitudRequest reqAplicacion);

        /// <summary>
        /// Validar si una cuenta permite un abono
        /// </summary>
        /// <param name="reqValidacion"></param>
        /// <returns></returns>
        public ReturnCodeInformation ValidarCuentaPermiteAbono(Service.ServiceRequests.ValidarCuentaPermiteAbonoRequest reqValidacion);

        /// <summary>
        /// Validar si una cuenta permite un cargo
        /// </summary>
        /// <param name="reqValidacion"></param>
        /// <returns></returns>
        public ReturnCodeInformation ValidarCuentaPermiteCargo(Service.ServiceRequests.ValidarCuentaPermiteCargoRequest reqValidacion);

        #endregion ModificacionLinea

        #region ConsBitacora

        /// <summary>
        /// Obtiene las columnas de los reportes
        /// </summary>
        /// <param name="idTipoReporte"></param>
        /// <returns></returns>
        public ReturnCodeInformation<List<ReporteDetalleColumnas>> ObtenerColumnasReportes(int idTipoReporte);

        #endregion ConsBitacora

        #region Security

        /// <summary>
        /// Obtiene las fechas de CREDPC
        /// </summary>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        public ReturnCodeInformation<Fechas> ObtenerFechasCredPc();

        #endregion Security
    }
}