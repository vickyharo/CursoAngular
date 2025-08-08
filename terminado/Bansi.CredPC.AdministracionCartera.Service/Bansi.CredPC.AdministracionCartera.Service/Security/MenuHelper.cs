using Bansi.Application.Security;
using Bansi.Application.Security.Common;
using Bansi.Application.Security.FactoryProviders;
using Bansi.Application.Security.Providers;
using Bansi.Application.UtilGlobSeg.Security;
using Bansi.CredPC.AdministracionCartera.Service.Modelo.Service;
using Bansi.CredPC.AdministracionCartera.Service.Negocio.Helpers;
using System.Collections.ObjectModel;

namespace Bansi.CredPC.AdministracionCartera.Service.Security
{
    public class MenuHelper
    {
        private static readonly List<OpcionMenuUsuario> _menus = new List<OpcionMenuUsuario>
        {
            //->Nombre de las apis que seran el menu principal

            //->Api: Modificación de Créditos
            new OpcionMenuUsuario{ Id = 1, SecurityOption = "MC", Name = "Modificación de Créditos", ParentId = null, OpcionesHijas = new Collection<OpcionMenuUsuario>
                {
                    new() { Id = 2, SecurityOption = "CCC", Name = "Cambio Cuenta de Cheques", ParentId = 1 , OpcionesHijas = new Collection<OpcionMenuUsuario>
                        {
                            new() { Id = 3, SecurityOption = "CCCRegistrar", Name = "Registrar", ParentId = 2, OpcionesHijas =  new Collection<OpcionMenuUsuario>
                                {
                                    new() {Id = 4, SecurityOption = "CCCRegistrarG", Name = "Guardar solicitud", ParentId = 3, OpcionesHijas = null},
                                    new() {Id = 5, SecurityOption = "CCCRegistrarA", Name = "Guardar/Autorizar solicitud", ParentId = 3, OpcionesHijas = null},
                                    new() {Id = 6, SecurityOption = "CCCRegistrarC", Name = "Cancelar solicitud", ParentId = 3, OpcionesHijas = null}                                  
                                }
                            },
                            new() { Id = 7, SecurityOption = "CCCAutorizar", Name = "Autorizar", ParentId= 2, OpcionesHijas = new Collection<OpcionMenuUsuario>
                                {
                                    new() {Id = 8, SecurityOption = "CCCAutorizarA", Name = "Autorizar solicitud", ParentId = 7, OpcionesHijas = null},
                                    new() {Id = 9, SecurityOption = "CCCAutorizarP", Name = "Aplicar solicitud", ParentId = 7, OpcionesHijas = null},
                                    new() {Id = 10, SecurityOption = "CCCAutorizarC", Name = "Cancelar solicitud", ParentId = 7, OpcionesHijas = null}
                                }
                           },
                        }
                    },
                    new() { Id = 11, SecurityOption = "CMLA", Name = "Cambio Monto de Línea Autorizada", ParentId= 1, OpcionesHijas = new Collection<OpcionMenuUsuario>
                        {
                            new() {Id = 12, SecurityOption = "CMLARegistrar", Name = "Registrar", ParentId = 11,  OpcionesHijas = new Collection<OpcionMenuUsuario>
                                {
                                    new() {Id = 13, SecurityOption = "CMLARegistrarG", Name = "Guardar solicitud", ParentId = 12, OpcionesHijas = null},
                                    new() {Id = 14, SecurityOption = "CMLARegistrarA", Name = "Guardar/Autorizar solicitud", ParentId = 12, OpcionesHijas = null},
                                    new() {Id = 15, SecurityOption = "CMLARegistrarC", Name = "Cancelar solicitud", ParentId = 12, OpcionesHijas = null}
                                }
                            },
                            new() {Id = 16, SecurityOption = "CMLAAutorizar", Name = "Autorizar", ParentId = 11, OpcionesHijas = new Collection<OpcionMenuUsuario>
                                {
                                    new() {Id = 17, SecurityOption = "CMLAAutorizarA", Name = "Autorizar solicitud", ParentId = 16, OpcionesHijas = null},
                                    new() {Id = 18, SecurityOption = "CMLAAutorizarP", Name = "Aplicar solicitud", ParentId = 16, OpcionesHijas = null},
                                    new() {Id = 19, SecurityOption = "CMLAAutorizarC", Name = "Cancelar solicitud", ParentId = 16, OpcionesHijas = null}
                                }
                            }
                        }
                    },
                    new() { Id = 20, SecurityOption = "CONS", Name = "Consultas", ParentId= 1, OpcionesHijas = new Collection<OpcionMenuUsuario>
                        {
                            new() {Id = 21, SecurityOption = "CONSBitacoraCuenta", Name = "Cambio de cuenta", ParentId = 20, OpcionesHijas = null},
                            new() {Id = 22, SecurityOption = "CONSBitacoraLinea", Name = "Cambio monto de linea", ParentId = 20, OpcionesHijas = null}
                        }
                    },
                }
            }
        };

        /// <summary>
        /// Gets allowed options by user
        /// </summary>
        /// <param name="usuario"></param>
        /// <remarks>Marco Espinoza Creación 07/03/2025</remarks>
        internal static ReturnCodeInformation<List<OpcionMenuUsuario>> ObtenerOpcionesUsuario(ISecurityUser securityUser, ISecurityModule securityModule)
        {
            try
            {
                ReturnCodeInformation<List<OpcionMenuUsuario>> returnCode = new ReturnCodeInformation<List<OpcionMenuUsuario>>();
                IAuthorizationProvider iAuthorizationProvider = SecurityFactory.CreateSecurityProviderFactory().GetAuthorizationProvider();
                returnCode.ResultItem = new List<OpcionMenuUsuario>();

                OpcionMenuUsuario menuRetorno = new OpcionMenuUsuario();
                //Recorremos los menús
                foreach (var menuPadre in _menus)
                {
                    menuRetorno = MenuRecursivo(menuPadre, securityUser, securityModule);
                    returnCode.ResultItem.Add(menuRetorno);
                }

                return returnCode;
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<List<OpcionMenuUsuario>>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<List<OpcionMenuUsuario>>(ex.Message);
            }
        }

        private static OpcionMenuUsuario MenuRecursivo(OpcionMenuUsuario item, ISecurityUser securityUser, ISecurityModule securityModule)
        {
            IAuthorizationProvider iAuthorizationProvider = SecurityFactory.CreateSecurityProviderFactory().GetAuthorizationProvider();
            OpcionMenuUsuario menuRetorno = new OpcionMenuUsuario();

            //Generamos la opción de security
            ISecurityOption securityOption = new SecurityOption
            {
                SecurityModule = securityModule,
                Name = item.SecurityOption,
            };

            //Validamos que el usuario tenga acceso
            IAuthorizationResult result = iAuthorizationProvider.Authorize(new AuthorizationRequest
            {
                SecurityOption = securityOption,
                SecurityUser = securityUser,
            });

            //Si no tiene acceso no agrega esta opción al menú
            if (!result.Success)
                return null; //new OpcionMenuUsuario(); //regresamos vacio el elemento

            // Si tiene acceso entonces agregamos la opción padre al menú retorno
            menuRetorno = new OpcionMenuUsuario
            {
                Id = item.Id,
                SecurityOption = item.SecurityOption,
                Name = item.Name,
                ParentId = item.ParentId,
                OpcionesHijas = new Collection<OpcionMenuUsuario>()
            };

            // Si tiene hijos llamamos nuevamente al metodo sino lo retornamos
            if (item.OpcionesHijas != null)
            {
                //Recorremos los menús hijos del menú
                foreach (OpcionMenuUsuario hija in item.OpcionesHijas)
                {
                    OpcionMenuUsuario opcionHija = MenuRecursivo(hija, securityUser, securityModule);
                    if (opcionHija != null)
                        menuRetorno.OpcionesHijas.Add(opcionHija);
                }
            }

            return menuRetorno;
        }

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

        /// <summary>
        /// Confirma la contraseña y el usuario
        /// </summary>
        /// <param name="usuario"></param>
        /// <param name="password"></param>
        /// <returns>True/False</returns>
        /// <remarks>Marco Espinoza 14/04/2025</remarks>
        internal static ReturnCodeInformation<bool> ConfirmPassword(string usuario, string password)
        {
            UtilGlob.Seguridad.AccesoSecurity accesoSecurity = new();
            try
            {
                return new ReturnCodeInformation<bool>(accesoSecurity.ValidarUsuario(usuario, password));
            }
            catch (Exception ex)
            {
                Extensions.Logging.LoggerHelper.LogException(ex);
                return (ex is ReturnCodeException rcEx) ?
                    new ReturnCodeInformation<bool>(rcEx.ReturnCode) :
                    ReturnCodeInformationFactoryHelper.GenerateGenericErrorReturnCode<bool>(ex.Message);
            }
        }
    }
}