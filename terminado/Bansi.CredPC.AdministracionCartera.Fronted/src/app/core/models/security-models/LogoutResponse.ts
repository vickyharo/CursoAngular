import { ReturnCodeInformation } from "./ReturnCodeInformation"

export interface LogoutResponse {
    operationResultItem: Boolean;
    returnCodeInformation: ReturnCodeInformation;
  }