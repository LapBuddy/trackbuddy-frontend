import { AxiosResponse } from "axios";
import { EnqueueSnackbar } from "notistack";
import api from "./api";

export const postLogin = async (
  username = "",
  password = "",
  enqueueSnackbar: EnqueueSnackbar
) => {
  const res = await api
    .post(
      "api/login/",
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": await getCsrfToken(),
        },
      }
    )
    .catch(function (e) {
      if (e.response.status == 400) {
        for (const [field, messages] of Object.entries(e.response.data)) {
          enqueueSnackbar(field + ": " + messages);
        }
      } else {
        console.error(e.response.status, e.response.data);
      }
    });
  return res;
};

export interface LogoutRes extends AxiosResponse {
  data: {
    success: string;
  };
}

export const getLogout = async () => {
  const { data }: LogoutRes = await api.get("api/logout/", {
    withCredentials: true,
  });

  return data;
};

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
