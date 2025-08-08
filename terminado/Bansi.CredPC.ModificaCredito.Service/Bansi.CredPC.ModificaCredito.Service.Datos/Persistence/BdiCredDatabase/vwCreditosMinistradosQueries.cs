using Bansi.Data.Queries;
using Bansi.EntityFrameworkCore.Common;
using Bansi.EntityFrameworkCore;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase para consultas a la vista
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/07/2024
    public class vwCreditosMinistradosQueries
    {

        /// <summary>
        /// Consulta creditos
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <returns></returns>
        public List<Modelo.DataModels.BdiCred.Vwcreditosministrados> ConsultarCreditos(string numeroCredito)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();
                    query.And(new Query(nameof(Modelo.DataModels.BdiCred.Vwcreditosministrados.NumeroCredito), QueryOperator.Contains, numeroCredito));

                    return bdiCredContext.Execute(x => x.VwCreditosMinistrados.Where(query.ToExpresion<Modelo.DataModels.BdiCred.Vwcreditosministrados>())).ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, numeroCredito);
                throw;
            }
        }

    }
}
