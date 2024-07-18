export interface IAuth {
  username: string;
  password: string;
}

export interface ITokenData {
  token: string;
}

export interface IAuthResponse {
  data: ITokenData;
  error_code: number;
  error_message: string;
  profiling: string;
  timings: null | string;
}
