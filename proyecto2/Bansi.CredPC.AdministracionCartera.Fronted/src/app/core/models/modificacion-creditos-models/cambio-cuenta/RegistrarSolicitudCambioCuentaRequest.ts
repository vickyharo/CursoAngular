export interface RegistrarSolicitudCambioCuentaRequest {
  numeroCredito: string
  usuarioSolicita: string
  idStatusSolicitud: number
  detalleSolicitud: DetalleRegistrarSolicitudCambioCuentaRequest[]
  comentario: string
}

export interface DetalleRegistrarSolicitudCambioCuentaRequest {
  clavenaturaleza: string
  clavetipocuenta: string
  coddivctanueva: string
  coddivctaoriginal: string
  codpdctoctanueva: string
  codpdctoctaoriginal: string
  cuentanueva: string
  cuentaoriginal: string
  iddetalle: number
  idsolicitud: number
}