using Bansi.EntityFrameworkCore.Common;
using Bansi.EntityFrameworkCore;
using Bansi.Data.Queries;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{

    /// <summary>
    /// Clase con consultas a BD
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/06/2024
    public class tblCatalogoNaturalezaQueries
    {

        #region Propiedades

        /// <summary>
        /// Obtiene las naturalezas registradas
        /// </summary>
        /// <returns></returns>
        public List<Modelo.DataModels.BdiCred.Tblcatalogonaturaleza> ObtenerNaturalezas()
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    return bdiCredContext.DbContext.TblCatalogoNaturaleza.AsEnumerable().ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Obtiene el tipo de naturaleza
        /// </summary>
        /// <param name="descripcion"></param>
        /// <returns></returns>
        public Modelo.DataModels.BdiCred.Tblcatalogonaturaleza ObtenerTipoNaturaleza(string descripcion)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();
                    query.And(new Query(nameof(Modelo.DataModels.BdiCred.Tblcatalogonaturaleza.DescripcionNaturaleza), QueryOperator.Equals, descripcion));

                    return bdiCredContext.Execute(x => x.TblCatalogoNaturaleza.Where(query.ToExpresion<Modelo.DataModels.BdiCred.Tblcatalogonaturaleza>())).First();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, descripcion);
                throw;
            }
        }

        #endregion Propiedades

    }
}
