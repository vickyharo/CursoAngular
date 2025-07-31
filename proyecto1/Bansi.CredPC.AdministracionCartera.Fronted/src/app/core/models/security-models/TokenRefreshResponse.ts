export interface TokenRefreshResponse{
    code: string;
    failure: boolean;
    success: boolean;
    displayableError: boolean;
    userMessage: string;
    message: string;
    systemNumber: number;
    operationResultItem: string;
}