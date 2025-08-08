using Bansi.Data.Queries;
using Bansi.EntityFrameworkCore;
using Bansi.EntityFrameworkCore.Common;
using Bansi.CredPC.ModificaCredito.Service.Modelo.DataModels.BdiCred;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase para acceso a BD
    /// </summary>
    /// <remarks>Marco Espinoza 21/03/2025</remarks>
    public class vwBitacoraModificacionSolicitudesQueries
    {
        public List<VwBitacoraModificacionSolicitudes> ObtenerBitacoraSolicitudes(string numerocredito, 
            DateTime fechaAutoriza, DateTime fechaSolicita, int tipoSolicitud, int estatus, string usuarioSolicita, string usuarioAutoriza)
        {
            try
            {
                using (IDbContextContainer<BDICredContext> bdiCredContext = DatabaseHelper.BDICred.BeginDbContext<BDICredContext>())
                {
                    QueryCollection query = new QueryCollection();

                    if (numerocredito.IsNotNullOrEmpty())
                        query.And(new Query(nameof(VwBitacoraModificacionSolicitudes.NumeroCredito_Linea), QueryOperator.Equals, numerocredito));

                    if (fechaAutoriza.Date > DateTime.MinValue.Date)
                        query.And(new Query(nameof(VwBitacoraModificacionSolicitudes.FechaAutoriza), QueryOperator.Equals, fechaAutoriza));

                    if (fechaSolicita.Date > DateTime.MinValue.Date)
                        query.And(new Query(nameof(VwBitacoraModificacionSolicitudes.FechaSolicitud), QueryOperator.Equals, fechaSolicita));

                    if (tipoSolicitud > Decimal.Zero)
                        query.And(new Query(nameof(VwBitacoraModificacionSolicitudes.IdTipoSolicitud), QueryOperator.Equals, tipoSolicitud));

                    if (estatus > Decimal.Zero)
                        query.And(new Query(nameof(VwBitacoraModificacionSolicitudes.IdEstatus), QueryOperator.Equals, estatus));

                    if (usuarioSolicita.IsNotNullOrEmpty())
                        query.And(new Query(nameof(VwBitacoraModificacionSolicitudes.UsuarioSolicita), QueryOperator.Equals, usuarioSolicita));

                    if (usuarioAutoriza.IsNotNullOrEmpty())
                        query.And(new Query(nameof(VwBitacoraModificacionSolicitudes.UsuarioAutoriza), QueryOperator.Equals, usuarioAutoriza));

                    return (query.Count() > 0) ?
                        bdiCredContext.Execute(x => x.VwBitacoraModificacionSolicitudes.Where(query.ToExpresion<VwBitacoraModificacionSolicitudes>())).ToList() :
                        bdiCredContext.DbContext.VwBitacoraModificacionSolicitudes.AsEnumerable().ToList();
                }
            }
            catch (Exception ex)
            {
                Bansi.Extensions.Logging.LoggerHelper.LogException(ex, numerocredito, fechaAutoriza, fechaSolicita, tipoSolicitud, estatus);
                throw;
            }
        }
    }
}
