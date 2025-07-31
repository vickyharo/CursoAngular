export interface RegistrarSolicitudCambioLineaRequest {
  numeroCredito: string
  usuarioSolicita: string
  idStatusSolicitud: number
  detalleSolicitudCambioLinea: DetalleSolicitudCambioLineaRequest
  comentario: string
}
export interface DetalleSolicitudCambioLineaRequest {
  idDetalle: number
  idSolicitud: number
  montoOriginal: number
  montoNuevo: number
}
