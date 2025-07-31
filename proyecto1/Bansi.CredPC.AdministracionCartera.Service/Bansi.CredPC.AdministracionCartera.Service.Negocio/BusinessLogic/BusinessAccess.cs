using Bansi.CredPC.AdministracionCartera.Service.Datos.Persistence.BdiCredDatabase;
using Bansi.CredPC.AdministracionCartera.Service.Modelo.Interfaces;
using Bansi.CredPC.AdministracionCartera.Service.Modelo.Service;
using Bansi.CredPC.AdministracionCartera.Service.Negocio.Helpers;

namespace Bansi.CredPC.AdministracionCartera.Service.Negocio.BusinessLogic
{
    /// <summary>
    /// Clase para el acceos a el negocio de la libreria
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/06/2024
    public class BusinessAccess : IBusinessAccess
    {
        #region Security

        /// <summary>
        /// Obtiene las fechas de CREDPC
        /// </summary>
        /// <returns></returns>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        public ReturnCodeInformation<Fechas> ObtenerFechasCredPc()
        {
            try
            {
                return new BDICredQueries().spObtenFechasCredPC();
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);

                return (ex is ReturnCodeException rcex) ?
                    new ReturnCodeInformation<Fechas>(rcex.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<Fechas>(ex.Message);
            }
        }

        #endregion Security
    }
}