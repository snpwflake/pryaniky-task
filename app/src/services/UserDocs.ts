import $api from "../https";
import { AxiosResponse } from "axios";
import { UserDocs } from "../models/userDocs";

export interface UserDocsResponse {
  data: UserDocs[];
  error_code: number;
  error_message: string;
  profiling: string;
  timings: null | string;
}

export default class fetchUserDocs {
  static async getUsers(): Promise<AxiosResponse<UserDocsResponse>> {
    return $api.get<UserDocsResponse>(
      "/ru/data/v3/testmethods/docs/userdocs/get"
    );
  }

  static async addUsers(params: UserDocs): Promise<AxiosResponse<UserDocs>> {
    return $api.post<UserDocs>(
      "/ru/data/v3/testmethods/docs/userdocs/create",
      params
    );
  }

  static async updateUsers(
    params: UserDocs,
    id: string
  ): Promise<AxiosResponse<UserDocs>> {
    return $api.post<UserDocs>(
      `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      params
    );
  }

  static async deleteUsers(id: string): Promise<AxiosResponse<UserDocs>> {
    return $api.delete<UserDocs>(
      `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`
    );
  }
}
