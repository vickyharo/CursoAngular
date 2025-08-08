namespace Bansi.CredPC.ModificaCredito.Service.Modelo.Interfaces
{
    public interface IDetalleSolicitud
    {
        #region Propiedades

        public string? Clavenaturaleza { get; set; }

        public string? Clavetipocuenta { get; set; }

        public string? Coddivctanueva { get; set; }

        public string? Coddivctaoriginal { get; set; }

        public string? Codpdctoctanueva { get; set; }

        public string? Codpdctoctaoriginal { get; set; }

        public string? Cuentanueva { get; set; }

        public string? Cuentaoriginal { get; set; }

        public string? Descdivctanueva { get; set; }

        public string? Descdivctaoriginal { get; set; }

        public string? Descpdctoctanueva { get; set; }

        public string? Descpdctoctaoriginal { get; set; }

        public int Iddetalle { get; set; }

        public int Idsolicitud { get; set; }

        public string? Naturaleza { get; set; }

        public string? Tipocuenta { get; set; }

        #endregion Propiedades
    }
}