using System.Collections.ObjectModel;

namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service
{
    /// <summary>
    /// Class to model user options
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 25/02/2025
    /// Marco Espinoza, Modificación 07/03/2025
    public class OpcionMenuUsuario
    {
        #region Properties

        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public string SecurityOption { get; set; }
        public Collection<OpcionMenuUsuario> OpcionesHijas { get; set; }

        #endregion Properties
    }
}