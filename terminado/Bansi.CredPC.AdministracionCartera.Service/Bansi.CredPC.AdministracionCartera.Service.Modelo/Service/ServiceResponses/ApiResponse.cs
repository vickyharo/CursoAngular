using System.Net;

namespace Bansi.CredPC.AdministracionCartera.Service.Modelo.Service.ServiceResponses
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsExitoso { get; set; }
        public string Mensaje { get; set; }
        public object Resultado { get; set; }
    }
}