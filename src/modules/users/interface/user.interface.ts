export interface IPlainUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  fitness_goals?: string[];
  preferences?: Record<string, any>;
}

export interface ISigninResponse {
  user: IPlainUser;
  token: string;
}

export interface WhereUser {
  _id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  age?: number;
}

export interface SuccessMessage {
  message: string;
}
