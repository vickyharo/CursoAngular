using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Reflection;

namespace Bansi.CredPC.ModificaCredito.Service.Datos.Persistence.BdiCredDatabase
{
    /// <summary>
    /// Clase con el mapeo entre BD y Datos
    /// </summary>
    /// Jorge Alejandro Ruiz Murillo, 07/06/2024
    internal partial class BDICredContext : DbContext
    {

        #region Constructor

        /// <summary>
        /// Constructor
        /// </summary>
        public BDICredContext()
        {
        }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="options"></param>
        public BDICredContext(DbContextOptions<BDICredContext> options) : base(options)
        {
        }

        #endregion Constructor

        #region Tablas a accesar

        /// <summary>
        /// Acceso a la vista de la BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.VwSolicitudModificacion> VwSolicitudModificacion { get; set; }

        /// <summary>
        /// Acceso a la vista en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.Vwdetallesolicitudcambiocuenta> VwDetalleSolicitudCambioCuenta { get; set; }

        /// <summary>
        /// Acceso a la tabla en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.Tbltipocuenta> TblTipoCuenta { get; set; }

        /// <summary>
        /// Acceso a la tabla en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.Tblcatalogonaturaleza> TblCatalogoNaturaleza { get; set; }

        /// <summary>
        /// Acceso a la tabla en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.Tblestatussolicitudcambiocuenta> TblEstatusSolicitudCambioCuentas { get; set; }

        /// <summary>
        /// Acceso a la tabla en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.TblReporteDetalleColumnas> TblReporteDetalleColumnas { get; set; }

        /// <summary>
        /// Acceso a vista en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.Vwcreditosministrados> VwCreditosMinistrados { get; set; }

        /// <summary>
        /// Acceso a vista en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.Vwcuentasasociadascredito> VwCuentasAsociadasCreditos { get; set; }

        /// <summary>
        /// Acceso a la tabla en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.TblTipoSolicitud> TblTipoSolicituds { get; set; }

        /// <summary>
        /// Acceso a la vista en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.VwBitacoraModificacionSolicitudes> VwBitacoraModificacionSolicitudes { get; set; }

        /// <summary>
        /// Acceso a la vista en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.VwSolicitudCambioLinea> VwSolicitudCambioLinea { get; set; }

        /// <summary>
        /// Acceso a la vista en BD
        /// </summary>
        public virtual DbSet<Modelo.DataModels.BdiCred.VwDetalleSolicitudCambioLinea> VwDetalleSolicitudCambioLinea { get; set; }

        #endregion Tablas a accesar

        #region Protected Methods

        /// <summary>
        /// Metodo para la creacion del modelo de tablas
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Modelo.DataModels.BdiCred.Tbltipocuenta>(entity =>
            {
                entity.HasKey(e => e.ClaveTipoCuenta).HasName("pk_tbltipocuenta");
            });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.Tblcatalogonaturaleza>(entity =>
            {
                entity.HasKey(e => e.ClaveNaturaleza).HasName("pk_tblcatalogonaturaleza");
            });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.Tblestatussolicitudcambiocuenta>(entity =>
            {
                entity.HasKey(e => e.IdEstatusSolicitud).HasName("pk_tblestatussolicitudcambiocuenta");
            });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.TblTipoSolicitud>(entity =>
            {
                entity.HasKey(e => e.IdTipoSolicitud).HasName("pk_tbltiposolicitud");
            });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.TblReporteDetalleColumnas>(entity =>
            {
                entity.HasKey(e => e.IdDetalle).HasName("pk_tblReporteDetalleColumnas");
            });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.VwSolicitudModificacion>(entity => { entity.HasNoKey(); });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.Vwdetallesolicitudcambiocuenta>(entity => { entity.HasNoKey(); });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.Vwcreditosministrados>(entity => { entity.HasNoKey(); });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.Vwcuentasasociadascredito>(entity => { entity.HasNoKey(); });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.VwBitacoraModificacionSolicitudes>(entity => { entity.HasNoKey(); });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.VwSolicitudCambioLinea>(entity => { entity.HasNoKey(); });

            modelBuilder.Entity<Modelo.DataModels.BdiCred.VwDetalleSolicitudCambioLinea>(entity => { entity.HasNoKey(); });

            OnModelCreatingPartial(modelBuilder);
        }

        #endregion Protected Methods

        #region Override Methods

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modelBuilder"></param>
        private partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        #endregion Protected Methods

    }
}

