export interface ISigninPayload {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
}

export interface ISigninResponse {
  user: ISigninPayload;
  token: string;
}
