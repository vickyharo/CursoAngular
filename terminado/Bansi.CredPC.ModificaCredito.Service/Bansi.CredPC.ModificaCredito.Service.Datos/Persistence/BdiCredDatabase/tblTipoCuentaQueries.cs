using Bansi.Data.Queries;
using Bansi.EntityFrameworkCore.Common;
using Bansi.EntityFrameworkCore;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase con consulta a tabla de BD
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/06/2023
    public class tblTipoCuentaQueries
    {

        #region Propiedades

        /// <summary>
        /// Obtiene los tipos de cuenta
        /// </summary>
        /// <returns></returns>
        public List<Modelo.DataModels.BdiCred.Tbltipocuenta> ObtenerTiposCuenta()
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    return bdiCredContext.DbContext.TblTipoCuenta.AsEnumerable().ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex);
                throw;
            }
        }

        /// <summary>
        /// Obtiene el tipo de cuenta por la descripcion
        /// </summary>
        /// <param name="descripcion"></param>
        /// <returns></returns>
        public Modelo.DataModels.BdiCred.Tbltipocuenta ObtenerTipoCuenta(string descripcion)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();
                    query.And(new Query(nameof(Modelo.DataModels.BdiCred.Tbltipocuenta.DescripcionTipoCuenta), QueryOperator.Equals, descripcion));

                    return bdiCredContext.Execute(x => x.TblTipoCuenta.Where(query.ToExpresion<Modelo.DataModels.BdiCred.Tbltipocuenta>())).First();
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
