export interface IPlainUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
}

export interface ISigninResponse {
  user: IPlainUser;
  token: string;
}

export interface WhereUser {
  email?: string;
  first_name?: string;
  last_name?: string;
  age?: number;
}
