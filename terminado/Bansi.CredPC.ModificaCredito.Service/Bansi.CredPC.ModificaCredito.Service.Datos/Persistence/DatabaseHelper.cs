namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence
{
    /// <summary>
    /// Clase DatabaseHelper contiene todas las referencias a todas las base de datos que usa el sistema.
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/06/2024
    internal class DatabaseHelper : Data.DatabaseFactoryManager
    {
        #region Propiedades

        private const string BDICRED_DBMS = "IFX bdicred";

        /// <summary>
        /// Acceso a la base de datos BDICRED
        /// </summary>
        public static Data.IDatabase BDICred
        {
            get { return Instance[BDICRED_DBMS]; }
        }

        #endregion Propiedades

        #region Singleton

        private static readonly Lazy<DatabaseHelper> instance = new Lazy<DatabaseHelper>(() => new DatabaseHelper());

        /// <summary>
        /// Instancia única.
        /// </summary>
        private static DatabaseHelper Instance
        {
            get
            {
                return instance.Value;
            }
        }

        /// <summary>
        /// Evita que se cree una instancia públicamente la clase <see cref="DatabaseHelper"/> .
        /// </summary>
        private DatabaseHelper()
        {
        }

        #endregion Singleton
    }
}