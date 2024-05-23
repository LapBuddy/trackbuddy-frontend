import { AxiosResponse } from "axios";
import api from "./api";

export interface CsrfRes extends AxiosResponse {
  data: {
    csrfToken: string;
  };
}

export const getCsrfToken = async () => {
  const { data }: CsrfRes = await api.get("api/csrf/", {
    withCredentials: true,
  });
  return data.csrfToken;
};
