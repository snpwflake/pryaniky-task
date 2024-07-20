import $api from "../https";
import { AxiosResponse } from "axios";
import { UserDocs } from "../models/userDocs";

export interface UserDocsResponse<T> {
  data: T;
  error_code: number;
  error_message: string;
  profiling: string;
  timings: null | string;
}

export default class fetchUserDocs {
  static async getUsers(): Promise<
    AxiosResponse<UserDocsResponse<UserDocs[]>>
  > {
    return $api.get<UserDocsResponse<UserDocs[]>>(
      "/ru/data/v3/testmethods/docs/userdocs/get"
    );
  }

  static async addDoc(
    params: UserDocs
  ): Promise<AxiosResponse<UserDocsResponse<UserDocs>>> {
    return $api.post<UserDocsResponse<UserDocs>>(
      "/ru/data/v3/testmethods/docs/userdocs/create",
      params
    );
  }

  static async updateDoc(
    params: UserDocs,
    id: string
  ): Promise<AxiosResponse<UserDocsResponse<UserDocs>>> {
    return $api.post<UserDocsResponse<UserDocs>>(
      `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
      params
    );
  }

  static async deleteDoc(
    id: string
  ): Promise<AxiosResponse<UserDocsResponse<UserDocs>>> {
    return $api.delete<UserDocsResponse<UserDocs>>(
      `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`
    );
  }
}
