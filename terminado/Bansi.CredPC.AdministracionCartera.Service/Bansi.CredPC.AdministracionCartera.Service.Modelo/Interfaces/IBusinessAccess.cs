using Bansi.CredPC.AdministracionCartera.Service.Modelo.Service;

namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Interfaces
{
    /// <summary>
    /// Interface with methods to implements
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo
    public interface IBusinessAccess
    {
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