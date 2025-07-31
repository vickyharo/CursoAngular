using Bansi.Application.Security.Common;

namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceRequests
{
    /// <summary>
    /// Class to request a login application
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 19/02/2025
    public class LoginUserApplicationRequest
    {
        #region Properties

        public string UserName { get; set; }

        public string UserPassword { get; set; }

        public string ApplicationName { get; set; }

        #endregion Properties

        #region Constructor

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="userPassword"></param>
        /// <param name="applicationName"></param>
        public LoginUserApplicationRequest(string userName, string userPassword, string applicationName)
        {
            UserName = userName;
            UserPassword = userPassword;
            ApplicationName = applicationName;
        }

        #endregion Constructor

        #region Public Methods

        /// <summary>
        /// Generates a LoginRequest to log session into Bansi.Security
        /// </summary>
        /// <returns></returns>
        public Application.UtilGlobSeg.Security.LoginRequest GenerateSecurityLoginRequest()
        {
            return new Application.UtilGlobSeg.Security.LoginRequest()
            {
                Password = UserPassword,
                SecurityUser = new SecurityUser() { Name = UserName },
                SecurityModule = new SecurityModule() { Name = ApplicationName }
            };
        }

        #endregion Public Methods
    }
}