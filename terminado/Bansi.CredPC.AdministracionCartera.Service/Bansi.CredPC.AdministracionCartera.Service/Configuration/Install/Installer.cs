using System.ComponentModel;
using System.Reflection;

namespace Bansi.CredPC.AdministracionCartera.Service.Configuration.Configuration.Install
{
    /// <summary>
    /// Proporciona servicios para generar una clase instalador que se pueda incorporar en los proyectos
    /// </summary>
    [RunInstaller(true)]
    [ToolboxItem(false)]
    public sealed class Installer : Bansi.Configuration.Install.Installer
    {
        /// <summary>
        /// Constructor de la clase EventLogSourceInstaller
        /// </summary>
        public Installer()
            : base()
        {
            Installers.Add(new Bansi.Configuration.Install.DefaultInstaller(Assembly.GetExecutingAssembly()));

            //TODO Si tiene mas instaladores como el de seguridad agregelos aqui
            Installers.Add(new SecurityInstaller());
        }
    }
}