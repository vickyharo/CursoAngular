export interface ReporteDetalleColumnasResponse{
    code: string;
    failure: boolean;
    success: boolean;
    displayableError: boolean;
    userMessage: any;
    message: any;
    systemNumber: any;
    operationResultItem: ResultDetalleColumnas[];
}

export interface ResultDetalleColumnas{
    idDetalle: number;
    idTipoReporte: number;
    columnaVisible: string;
    reportHeader: string;
}