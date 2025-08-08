using Bansi.EntityFrameworkCore.Common;
using Bansi.EntityFrameworkCore;
using Bansi.Data.Queries;
using Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    public class tblReporteDetalleColumnasQueries
    {
        #region Propiedades

        /// <summary>
        /// Obtiene las columnas para un tipo de reporte
        /// </summary>
        /// <param name="tipoReporte"></param>
        /// <remarks>Marco Espinoza 10/04/2025 Creación</remarks>
        public List<TblReporteDetalleColumnas> ObtenerColumnasReportes(int tipoReporte)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();
                    query.And(new Query(nameof(TblReporteDetalleColumnas.IdTipoReporte), QueryOperator.Equals, tipoReporte));

                    return bdiCredContext.Execute(x => x.TblReporteDetalleColumnas.Where(query.ToExpresion<TblReporteDetalleColumnas>())).ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, tipoReporte);
                throw;
            }
        }

        #endregion Propiedades
    }
}
