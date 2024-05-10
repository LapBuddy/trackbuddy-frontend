import { AxiosResponse } from "axios";
import { EnqueueSnackbar } from "notistack";
import api from "./api";

interface LoginRes extends AxiosResponse {
  data: {
    token: string;
    expiry: string;
  };
}

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
    .catch((e) => {
      if (e.response.status == 400) {
        for (const [field, messages] of Object.entries(e.response.data)) {
          enqueueSnackbar(field + ": " + messages);
        }
      } else {
        console.error(e.response.status, e.response.data);
      }
      return e.response;
    });

  localStorage.setItem("token", "Token " + res.data.token);
  return res;
};

// export const postSignup = async (
//   username = "",
//   password = "",
//   enqueueSnackbar: EnqueueSnackbar
// ) => {
//   const res: LoginRes = await api
//     .post(
//       "api/login/",
//       {
//         username: username,
//         password: password,
//       },
//       {
//         withCredentials: true,
//         headers: {
//           "X-CSRFToken": await getCsrfToken(),
//         },
//       }
//     )
//     .catch(function (e) {
//       if (e.response.status == 400) {
//         for (const [field, messages] of Object.entries(e.response.data)) {
//           enqueueSnackbar(field + ": " + messages);
//         }
//       } else {
//         console.error(e.response.status, e.response.data);
//       }
//       return e;
//     });

//   localStorage.setItem("token", "Token " + res.data.token);
//   return res;
// };

export const postLogout = async (enqueueSnackbar: EnqueueSnackbar) => {
  const res = await api
    .post(
      "api/logout/",
      {},
      {
        headers: {
          "X-CSRFToken": await getCsrfToken(),
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .catch((e) => {
      if (e.response.data.detail) {
        enqueueSnackbar(e.response.data.detail);
      } else {
        enqueueSnackbar(e.response.data.toString());
      }
      return e.response;
    });

  localStorage.removeItem("token");
  return res;
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
