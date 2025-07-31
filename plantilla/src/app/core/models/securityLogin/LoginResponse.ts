import { ReturnCodeInformation } from "./ReturnCodeInformation"
import { SecurityJwt } from "./SecurityJwt"

export interface LoginResponse {
    code: string
    failure: boolean
    success: boolean
    displayableError: boolean
    userMessage: string
    message: string
    systemNumber: number
    operationResultItem: OperationResultItem;
}

export interface SessionInformation{
  userInformation:UserInformation;
  impersonationInformation:ImpersonationInformation;
  isImpersonation:Boolean;
  securityModule:SecurityModule;
  branchNumber: string;
}

export interface UserInformation{
  name:string;
  fullName:string;
  email:string;
}

export interface ImpersonationInformation{
  agent:UserInformation;
  user:UserInformation;
}

export interface SecurityModule{
  name:string;
  description:string;
  version:string;
  securityApplication: {
    name:string;
    description:string;
  }
}

export interface UserOptionsAllowed{
  id:number;
  name:string;
  parentId:number;
  securityOption:string;
  opcionesHijas:Array<UserOptionsAllowed>;
}

export interface OperationResultItem{
  mustContinue: boolean;
  sesionInformation: SessionInformation;
  tokenApplication: string;
  userOptionsAllowed: Array<UserOptionsAllowed>;
}