using Bansi.Data.Queries;
using Bansi.EntityFrameworkCore.Common;
using Bansi.EntityFrameworkCore;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase para acceso a BD
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 10/07/2024
    public class vwCuentasAsociadasCreditoQueries
    {
        /// <summary>
        /// Consulta de cuentas
        /// </summary>
        /// <param name="numeroCredito"></param>
        /// <returns></returns>
        public List<Modelo.DataModels.BdiCred.Vwcuentasasociadascredito> ConsultarCuentasCredito(string numeroCredito)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();
                    query.And(new Query(nameof(Modelo.DataModels.BdiCred.Vwcuentasasociadascredito.NumeroCredito), QueryOperator.Equals, numeroCredito));

                    return bdiCredContext.Execute(x => x.VwCuentasAsociadasCreditos.Where(query.ToExpresion<Modelo.DataModels.BdiCred.Vwcuentasasociadascredito>())).ToList();
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
