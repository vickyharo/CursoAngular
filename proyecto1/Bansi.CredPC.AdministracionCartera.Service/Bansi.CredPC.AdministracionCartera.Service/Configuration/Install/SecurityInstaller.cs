using Bansi.Application.Security.Common;
using Bansi.Application.UtilGlobSeg.Security;
using System.Collections;
using System.ComponentModel;
using System.Reflection;

//TODO: Eliminar esta clase si no se necesita registar permisos no pertenecientes a un menú o formulario.

namespace Bansi.CredPC.AdministracionCartera.Service.Configuration.Configuration.Install
{
    /// <summary>
    /// Clase de instalador para agregar opciones al módulo de security
    /// </summary>
    /// <remarks>Se utiliza para servicios web o librerías que no cuentan con registro de opciones a través de un SecurityAdapter.</remarks>
    [ToolboxItem(false)]
    public sealed class SecurityInstaller : Bansi.Configuration.Install.Installer
    {
        /// <summary>
        /// Constructor vacío, llama a base para inicializar la instancia del componente.
        /// </summary>
        public SecurityInstaller()
            : base()
        {
        }

        /// <summary>
        /// Método para registro de opciones.
        /// </summary>
        private static void RegistrarOpciones()
        {
            //Obtengo el nombre del modulo que estoy ejecutando
            SecurityModule securityModule = new SecurityModule()
            {
                Name = Path.GetFileName(Assembly.GetExecutingAssembly().Location).ToUpper()
            };

            #region Cambio Cuenta de Cheques

            //-> Id: 1
            SecurityOption securityOptionParentMC = new SecurityOption()
            {
                Name = "MC",//El nombre de la opción debe ser único por módulo, en un menú corresponde al nombre del control.
                Description = "Modificación de Créditos",//La descripción es el texto que aparecerá en el módulo de seguridad cuando se asigna la opción.
                SecurityModule = securityModule,//Asigno el módulo a la opción.
                ParentOption = null,//Dado que es una opción raíz, indico que no tiene padre, este es el valor por defecto.
            };

            //-> Id: 2
            SecurityOption securityOptionParentCCC = new SecurityOption()
            {
                Name = "CCC",//El nombre de la opción debe ser único por módulo, en un menú corresponde al nombre del control.
                Description = "Cambio Cuenta de Cheques",//La descripción es el texto que aparecerá en el módulo de seguridad cuando se asigna la opción.
                SecurityModule = securityModule,//Asigno el módulo a la opción.
                ParentOption = securityOptionParentMC,//Dado que es una opción raíz, indico que no tiene padre, este es el valor por defecto.
            };

            // Id: 3
            SecurityOption securityOptionChildCCCRegistrar = new SecurityOption()
            {
                Name = "CCCRegistrar",
                Description = "Registrar",
                SecurityModule = securityModule,
                ParentOption = securityOptionParentCCC,//Asigno su opción padre.
            };

            // Id: 4
            SecurityOption securityOptionChildCCCRegistrarG = new SecurityOption()
            {
                Name = "CCCRegistrarG",
                Description = "Guardar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCCCRegistrar,//Asigno su opción padre.
            };

            // Id: 5
            SecurityOption securityOptionChildCCCRegistrarA = new SecurityOption()
            {
                Name = "CCCRegistrarA",
                Description = "Guardar/Autorizar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCCCRegistrar,//Asigno su opción padre.
            };

            // Id: 6
            SecurityOption securityOptionChildCCCRegistrarC = new SecurityOption()
            {
                Name = "CCCRegistrarC",
                Description = "Cancelar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCCCRegistrar,//Asigno su opción padre.
            };

            // Id: 7
            SecurityOption securityOptionChildCCCAutorizar = new SecurityOption()
            {
                Name = "CCCAutorizar",
                Description = "Autorizar",
                SecurityModule = securityModule,
                ParentOption = securityOptionParentCCC,//Asigno su opción padre.
            };

            // Id: 8
            SecurityOption securityOptionChildCCCAutorizarA = new SecurityOption()
            {
                Name = "CCCAutorizarA",
                Description = "Autorizar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCCCAutorizar,//Asigno su opción padre.
            };

            // Id: 9
            SecurityOption securityOptionChildCCCAutorizarP = new SecurityOption()
            {
                Name = "CCCAutorizarP",
                Description = "Aplicar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCCCAutorizar,//Asigno su opción padre.
            };

            // Id: 10
            SecurityOption securityOptionChildCCCAutorizarC = new SecurityOption()
            {
                Name = "CCCAutorizarC",
                Description = "Cancelar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCCCAutorizar,//Asigno su opción padre.
            };

            #endregion Cambio Cuenta de Cheques

            #region Cambio Monto Linea Autorizada

            // Id: 11
            SecurityOption securityOptionParentCMLA = new SecurityOption()
            {
                Name = "CMLA",//El nombre de la opción debe ser único por módulo, en un menú corresponde al nombre del control.
                Description = "Cambio Monto de Línea Autorizada",//La descripción es el texto que aparecerá en el módulo de seguridad cuando se asigna la opción.
                SecurityModule = securityModule,//Asigno el módulo a la opción.
                ParentOption = securityOptionParentMC,//Dado que es una opción raíz, indico que no tiene padre, este es el valor por defecto.
            };

            // Id: 12
            SecurityOption securityOptionChildCMLARegistrar = new SecurityOption()
            {
                Name = "CMLARegistrar",
                Description = "Registrar",
                SecurityModule = securityModule,
                ParentOption = securityOptionParentCMLA,//Asigno su opción padre.
            };

            // Id: 13
            SecurityOption securityOptionChildCMLARegistrarG = new SecurityOption()
            {
                Name = "CMLARegistrarG",
                Description = "Guardar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCMLARegistrar,//Asigno su opción padre.
            };

            // Id: 14
            SecurityOption securityOptionChildCMLARegistrarA = new SecurityOption()
            {
                Name = "CMLARegistrarA",
                Description = "Guardar/Autorizar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCMLARegistrar,//Asigno su opción padre.
            };

            // Id: 15
            SecurityOption securityOptionChildCMLARegistrarC = new SecurityOption()
            {
                Name = "CMLARegistrarC",
                Description = "Cancelar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCMLARegistrar,//Asigno su opción padre.
            };

            // Id: 16
            SecurityOption securityOptionChildCMLAAutorizar = new SecurityOption()
            {
                Name = "CMLAAutorizar",
                Description = "Autorizar",
                SecurityModule = securityModule,
                ParentOption = securityOptionParentCMLA,//Asigno su opción padre.
            };

            // Id: 17
            SecurityOption securityOptionChildCMLAAutorizarA = new SecurityOption()
            {
                Name = "CMLAAutorizarA",
                Description = "Autorizar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCMLAAutorizar,//Asigno su opción padre.
            };

            // Id: 18
            SecurityOption securityOptionChildCMLAAutorizarP = new SecurityOption()
            {
                Name = "CMLAAutorizarP",
                Description = "Aplicar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCMLAAutorizar,//Asigno su opción padre.
            };

            // Id: 19
            SecurityOption securityOptionChildCMLAAutorizarC = new SecurityOption()
            {
                Name = "CMLAAutorizarC",
                Description = "Cancelar solicitud",
                SecurityModule = securityModule,
                ParentOption = securityOptionChildCMLAAutorizar,//Asigno su opción padre.
            };

            #endregion Cambio Monto Linea Autorizada

            #region Consultas

            // Id: 20
            SecurityOption securityOptionParentCONS = new SecurityOption()
            {
                Name = "CONS",//El nombre de la opción debe ser único por módulo, en un menú corresponde al nombre del control.
                Description = "Consultas",//La descripción es el texto que aparecerá en el módulo de seguridad cuando se asigna la opción.
                SecurityModule = securityModule,//Asigno el módulo a la opción.
                ParentOption = securityOptionParentMC,//Dado que es una opción raíz, indico que no tiene padre, este es el valor por defecto.
            };

            // Id: 21
            SecurityOption securityOptionChildCONSBitacoraCuenta = new SecurityOption()
            {
                Name = "CONSBitacoraCuenta",
                Description = "Cambio de cuenta",
                SecurityModule = securityModule,
                ParentOption = securityOptionParentCONS,//Asigno su opción padre.
            };

            // Id: 22
            SecurityOption securityOptionChildCONSBitacoraLinea = new SecurityOption()
            {
                Name = "CONSBitacoraLinea",
                Description = "Cambio monto de linea",
                SecurityModule = securityModule,
                ParentOption = securityOptionParentCONS,//Asigno su opción padre.
            };

            #endregion Consultas

            //Llamamos al método para guardar las opciones en el módulo, en caso de llamadas subsecuentes ignora las opciones que ya existen.
            securityModule.SaveOptions(new SecurityOption[]
            {
                securityOptionParentMC,
                    securityOptionParentCCC,
                        securityOptionChildCCCRegistrar,
                            securityOptionChildCCCRegistrarG,
                            securityOptionChildCCCRegistrarA,
                            securityOptionChildCCCRegistrarC,
                        securityOptionChildCCCAutorizar,
                            securityOptionChildCCCAutorizarA,
                            securityOptionChildCCCAutorizarP,
                            securityOptionChildCCCAutorizarC,
                    securityOptionParentCMLA,
                        securityOptionChildCMLARegistrar,
                            securityOptionChildCMLARegistrarG,
                            securityOptionChildCMLARegistrarA,
                            securityOptionChildCMLARegistrarC,
                        securityOptionChildCMLAAutorizar,
                            securityOptionChildCMLAAutorizarA,
                            securityOptionChildCMLAAutorizarP,
                            securityOptionChildCMLAAutorizarC,
                    securityOptionParentCONS,
                        securityOptionChildCONSBitacoraCuenta,
                        securityOptionChildCONSBitacoraLinea
            });
        }

        /// <summary>
        /// </summary>
        /// <param name="stateSaver">No need to change this.</param>
        public override void Install(IDictionary stateSaver)
        {
            base.Install(stateSaver);
            //Llamamos al método para registro de opciones como parte del proceso de instalación.
            RegistrarOpciones();
        }
    }
}