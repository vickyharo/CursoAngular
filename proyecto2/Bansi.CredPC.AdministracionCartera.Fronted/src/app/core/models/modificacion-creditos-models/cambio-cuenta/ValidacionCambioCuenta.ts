import { DetalleRegistrarSolicitudCambioCuentaRequest } from "./RegistrarSolicitudCambioCuentaRequest"


export interface ValidacionCambioCuenta {
  cuentaValida: boolean;
  mensaje: string;
  DetalleSolicitudCambioCuentaRequest: DetalleRegistrarSolicitudCambioCuentaRequest;
}

