export interface ConsultarCuentasAsociadasCreditoResponse {
    operationResultItem: ResultConsultarCuentasAsociadasCreditoResponse[]
    code: string
    failure: boolean
    success: boolean
    displayableError: boolean
    userMessage: string
    message: string
    systemNumber: any
  }

  export interface ResultConsultarCuentasAsociadasCreditoResponse {
    numeroCredito: string
    codTipoCuenta: string
    codNaturaleza: string
    naturaleza: string
    aplicacionCuenta: string
    esProductoChequesCredito: string
    cuentaCheques: string
    numeroCliente: string
    codDivisa: string
    divisa: string
    tipoCuenta: string
    producto: string
    nombreCliente: string
  }