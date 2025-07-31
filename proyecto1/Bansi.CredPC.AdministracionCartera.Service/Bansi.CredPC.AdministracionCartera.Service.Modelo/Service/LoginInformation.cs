using Bansi.Application.Security;

namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service
{
    /// <summary>
    /// Class to map response from login response
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 18/02/2025
    public sealed class LoginInformation
    {
        #region Public properties

        public ISessionInformation SesionInformation { get; }

        public string TokenApplication { get; }

        public bool MustContinue { get; }

        public List<OpcionMenuUsuario> UserOptionsAllowed { get; }

        #endregion Public properties

        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="sessionInformation"></param>
        /// <param name="tokenApplicacion"></param>
        /// <param name="mustContinue"></param>
        /// <param name="userOptionsAllowed"></param>
        public LoginInformation(ISessionInformation sessionInformation, string tokenApplicacion, bool mustContinue, List<OpcionMenuUsuario> userOptionsAllowed)
        {
            SesionInformation = sessionInformation;
            TokenApplication = tokenApplicacion;
            MustContinue = mustContinue;
            UserOptionsAllowed = userOptionsAllowed;
        }

        #endregion Constructor
    }
}