export interface ObtenerEstatusSolicitudCambioCuentaResponse {
  operationResultItem: ResultObtenerEstatusSolicitudCambioCuentaResponse[]
  code: string
  failure: boolean
  success: boolean
  displayableError: boolean
  userMessage: string
  message: string
  systemNumber: any
}

export interface ResultObtenerEstatusSolicitudCambioCuentaResponse {
  idEstatusSolicitud: number
  descripcionEstatus: string
}
