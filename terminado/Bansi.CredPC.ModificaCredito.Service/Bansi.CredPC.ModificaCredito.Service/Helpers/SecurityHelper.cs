using Bansi.CredPC.ModificaCredito.Service.Negocio.Helpers;

namespace Bansi.CredPC.ModificaCredito.Service.Helpers
{
    public class SecurityHelper
    {
        /// <summary>
        /// Obtiene la versión del compilado
        /// </summary>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        internal static ReturnCodeInformation<string> ObtenerVersion()
        {
            try
            {
                ReturnCodeInformation<string> returnCode = new ReturnCodeInformation<string>();
                System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
                System.Diagnostics.FileVersionInfo fvi = System.Diagnostics.FileVersionInfo.GetVersionInfo(assembly.Location);
                string? version = fvi.FileVersion;

                returnCode.ResultItem = version ?? throw new InvalidOperationException("No se obtuvo la versión del archivo");
                return returnCode;
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<string>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<string>(ex.Message);
            }
        }
    }
}
