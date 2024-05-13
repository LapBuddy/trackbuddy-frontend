import { EnqueueSnackbar } from "notistack";
import { getCsrfToken } from "./utils";
import api from "./api";

export const postSetup = async (
  name = "",
  make = "",
  model = "",
  year = "",
  tires = "",
  pressure = "",
  suspension = "",
  other = "",
  enqueueSnackbar: EnqueueSnackbar
) => {
  const res = await api
    .post(
      "setups/",
      {
        name: name,
        make: make,
        model: model,
        year: year,
        tires: tires,
        pressure: pressure,
        suspension: suspension,
        other: other,
      },
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": await getCsrfToken(),
          Authorization: localStorage.getItem("token"),
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

  return res;
};

export const getSetups = async (enqueueSnackbar: EnqueueSnackbar) => {
  const res = await api
    .get("setups/", {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
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
  return res;
};
