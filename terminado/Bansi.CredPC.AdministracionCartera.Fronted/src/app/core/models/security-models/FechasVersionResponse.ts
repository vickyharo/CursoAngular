export interface FechasVersionResposne{
    code: string
    failure: boolean
    success: boolean
    displayableError: boolean
    userMessage: string
    message: string
    systemNumber: number
    operationResultItem: OperationResultItem;
}

export interface OperationResultItem{
    fechaHoy:Date;
    fechaAnt:Date;
    proxFecha:Date;
    priDiaNaturalMes:Date;
    priDiaHabilMes:Date;
    ultDiaNaturalMes:Date;
    ultDiaHabilMes:Date;
    version:string;
}