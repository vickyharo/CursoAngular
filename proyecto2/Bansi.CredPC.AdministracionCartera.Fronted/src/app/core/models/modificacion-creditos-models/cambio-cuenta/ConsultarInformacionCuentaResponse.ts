export interface ConsultarInformacionCuentaResponse {
  operationResultItem: ResultConsultarInformacionCuentaResponse
  code: string
  failure: boolean
  success: boolean
  displayableError: boolean
  userMessage: string
  message: string
  systemNumber: any
}

export interface ResultConsultarInformacionCuentaResponse {
  cuentaCheques: string
  tipoCuenta: string
  numeroCliente: string
  divisa: string
  codDivisa: string
  producto: string
  nombreCliente: string
  tipoPersonaCte: string
  tipoCliente: string
  estatusCte: string
}