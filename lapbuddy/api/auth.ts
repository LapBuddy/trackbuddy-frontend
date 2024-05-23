import { EnqueueSnackbar, enqueueSnackbar } from "notistack";
import api from "./api";
import { getCsrfToken } from "./utils";

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

export const postSignup = async (
  username = "",
  firstName = "",
  lastName = "",
  email = "",
  password = "",
  enqueueSnackbar: EnqueueSnackbar
) => {
  const res = await api
    .post(
      "api/register/",
      {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
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
      return e.response;
    });

  localStorage.setItem("token", "Token " + res.data.token);
  return res;
};

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

export const getProfile = async (enqueueSnackbar: EnqueueSnackbar) => {
  const res = await api
    .get("api/profile/", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .catch((e) => {
      if (e.response.data.detail) {
        enqueueSnackbar(e.response.data.detail);
      } else {
        enqueueSnackbar(e.response.data.toString());
      }
      return e.response;
    });
  return res;
};

export const updateProfile = async (
  first_name: string,
  last_name: string,
  email: string,
  enqueueSnackbar: EnqueueSnackbar
) => {
  const res = await api
    .put(
      "api/profile/",
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "X-CSRFToken": await getCsrfToken(),
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
  return res;
};
