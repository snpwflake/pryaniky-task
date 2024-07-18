import $api from "../https";
import { AxiosResponse } from "axios";
import { IAuthResponse, IAuth } from "../models/auth";
export default class AuthProvider {
  static async auth(params: IAuth): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>(
      "/ru/data/v3/testmethods/docs/login",
      params,
      {}
    );
  }
}
