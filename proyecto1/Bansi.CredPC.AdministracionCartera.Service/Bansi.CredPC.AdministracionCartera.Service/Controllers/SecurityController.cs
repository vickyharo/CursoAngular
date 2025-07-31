using Bansi.Application.Security;
using Bansi.Application.Security.Common;
using Bansi.Application.Security.FactoryProviders;
using Bansi.Application.Security.Providers;
using Bansi.Application.UtilGlobSeg.Security;
using Bansi.CredPC.AdministracionCartera.Service.Modelo.Interfaces;
using Bansi.CredPC.AdministracionCartera.Service.Modelo.Service;
using Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceRequests;
using Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceResponses;
using Bansi.CredPC.AdministracionCartera.Service.Negocio.Helpers;
using Bansi.CredPC.AdministracionCartera.Service.Helpers;
using Bansi.CredPC.AdministracionCartera.Service.Security;
using Bansi.CredPC.Bitacora;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using static Bansi.CredPC.AdministracionCartera.Service.Constants.CommonConstants;

namespace Bansi.CredPC.AdministracionCartera.Service.Controllers
{
    /// <summary>
    /// Endpoint to manage the user logins
    /// </summary>
    /// Jorge alejandro Ruiz Murillo,
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        #region Properties

        private readonly IConfiguration configuration;
        private readonly IBusinessAccess BusinessLogic;
        private ApiResponse _response;

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="configuration"></param>
        public SecurityController(IConfiguration configuration, IBusinessAccess BusinessLogic)
        {
            this.configuration = configuration;
            this.BusinessLogic = BusinessLogic;
        }

        #endregion Constructor

        #region Public Methods

        /// <summary>
        /// Opens new user session
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="ReturnCodeException"></exception>
        /// <exception cref="InvalidOperationException"></exception>
        [HttpPost(nameof(LoginUserApplication))]
        public LoginServiceApplicationResponse LoginUserApplication([FromBody] LoginUserApplicationRequest request)
        {
            try
            {
                if (request == null) throw new ArgumentNullException($"Request no valido para acceso al servicio");

                ISessionProvider sessionProvider = SecurityFactory.CreateSecurityProviderFactory().GetSessionProvider();
                ILoginResponse response = sessionProvider.Login(request.GenerateSecurityLoginRequest());

                if (!response.Success) throw new ReturnCodeException(GenereateFailedRequirements(response.FailedRequirements));

                if (response.MustContinue && !response.AuthenticateMethods.Contains("Token"))
                {
                    throw new InvalidOperationException("Se requiere una segunda verificación y su tipo no es soportada.");
                }

                ISecurityUser iSecurityUser = response.SessionInformation.UserInformation.Complete();

                ISecurityModule iSecurityModule = new SecurityModule()
                {
                    Name = Path.GetFileName(Assembly.GetExecutingAssembly().Location).ToUpper()
                };

                ReturnCodeInformation<List<OpcionMenuUsuario>> returnCodeOptions = MenuHelper.ObtenerOpcionesUsuario(iSecurityUser, iSecurityModule);

                return new LoginServiceApplicationResponse(ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(new LoginInformation
                (
                    response.SessionInformation,
                    JWTHelper.GenerateTokenApplication(configuration, request.UserName, request.ApplicationName),
                    response.MustContinue,
                    returnCodeOptions.ResultItem
                )));
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(request.UserName, "ERROR EN EL LOGIN DE LA APLICACIÓN");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex, request);

                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Logout the user from the application
        /// </summary>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost(nameof(LogoutUserApplication))]
        public LogoutUserApplicationResponse LogoutUserApplication()
        {
            String UserName = string.Empty;
            try
            {
                Claim claimUser = User.Claims.FirstOrDefault(claim => claim.Type == JwtConfigConst.ClaimUserName) ??
                   throw new InvalidOperationException("No se enontró informacion para el cierre de la sesion");

                Claim claimAppName = User.Claims.FirstOrDefault(claim => claim.Type == JwtConfigConst.ClaimAppName) ??
                    throw new InvalidOperationException("No se enontró informacion para el cierre de la sesion");
                UserName = claimUser.Value;
                SessionInformation sessionInformation = new()
                {
                    UserInformation = new SecurityUser() { Name = claimUser.Value },
                    SecurityModule = new SecurityModule() { Name = claimAppName.Value }
                };

                ISessionProvider sessionProvider = SecurityFactory.CreateSecurityProviderFactory().GetSessionProvider();
                sessionProvider.Logout(sessionInformation);

                return new LogoutUserApplicationResponse(ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode());
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(UserName, "ERROR EN EL LOGOUT DE LA APLICACIÓN");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new LogoutUserApplicationResponse(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Refresh the token
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost(nameof(RefreshUserApplicationToken))]
        public RefreshUserApplicationTokenResponse RefreshUserApplicationToken()
        {
            string UserName = string.Empty;
            try
            {
                Claim claimUser = User.Claims.FirstOrDefault(claim => claim.Type == JwtConfigConst.ClaimUserName) ??
                    throw new InvalidOperationException("No se enontró informacion de la sesion para la actualización de token");

                Claim claimAppName = User.Claims.FirstOrDefault(claim => claim.Type == JwtConfigConst.ClaimAppName) ??
                    throw new InvalidOperationException("No se enontró informacion de la sesion para la actualización de token");

                UserName = claimUser.Value;

                string newUserToken = JWTHelper.GenerateTokenApplication(configuration, claimUser.Value, claimAppName.Value);

                return new(ReturnCodeInformationFactoryHelper.GenerateGenericSuccessReturnCode(newUserToken));
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica(UserName, "ERROR AL REFRESCAR EL TOKEN");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Obtiene las fechas y la versión del compilado
        /// </summary>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        [HttpGet(nameof(GetVersionDate))]
        [AllowAnonymous]
        public ObtenerFechaVersionResponse GetVersionDate()
        {
            try
            {
                ReturnCodeInformation<string> version = MenuHelper.ObtenerVersion();
                if (version.Failure)
                    throw new InvalidOperationException("No se obtuvo la versión del archivo");

                ReturnCodeInformation<Fechas> fechas = BusinessLogic.ObtenerFechasCredPc();
                if (fechas.Failure)
                    throw new InvalidOperationException("No se obtuvo la fecha del sistema " + fechas.Message);

                fechas.ResultItem.Version = version.ResultItem;
                return new ObtenerFechaVersionResponse(fechas);
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica("Usuario Genérico Modificación Créditos", "ERROR AL OBTENER FECHA Y VERSIÓN");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        /// <summary>
        /// Valida que la contraseña y el usuario sean correctos
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Boolean</returns>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost(nameof(ConfirmPassword))]
        public ConfirmPasswordResponse ConfirmPassword([FromBody] ConfirmPasswordRequest request)
        {
            try
            {
                ReturnCodeInformation<bool> returnCode = MenuHelper.ConfirmPassword(request.Usuario, request.Password);

                return new ConfirmPasswordResponse(returnCode);
            }
            catch (Exception ex)
            {
                BitacoraTecnica bitTecnica = CredPCBitacoraHelper.GenerarBitacoraTecnica("Usuario Genérico Modificación Créditos", "ERROR AL CONFIRMAR CONTRASEÑA");
                GuardarBitacoraCred.GuardarBitacoraTecnica(bitTecnica, ex);
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new(rcEx.ReturnCode) :
                    new(ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode(ex.Message));
            }
        }

        #endregion Public Methods

        #region Private Methods

        /// <summary>
        /// Generate ReturnCodeInformation with all failed requirements from login response
        /// </summary>
        /// <param name="failedRequirements"></param>
        /// <returns></returns>
        private static ReturnCodeInformation GenereateFailedRequirements(IEnumerable<IReturnCodeInformation> failedRequirements)
        {
            ReturnCodeInformation result = new ReturnCodeInformation(failedRequirements.FirstOrDefault());

            StringBuilder builder = new StringBuilder();

            failedRequirements.ToList().ForEach(x => { builder.AppendLine($"{x.Code} - {x.Message}"); });

            result.Message = builder.ToString();

            return result;
        }

        #endregion Private Methods
    }
}