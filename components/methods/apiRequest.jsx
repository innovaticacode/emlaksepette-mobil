import axios from "axios";
import { getValueFor } from "./user";
import { useState } from "react";
export const apiUrl = "https://private.emlaksepette.com/api/";
export const frontEndUri = "https://private.emlaksepette.com/api/";
export const frontEndUriBase = "https://private.emlaksepette.com/";

export const apiRequestGet = (url) => {
  return axios.get(apiUrl + url);
};

export const apiRequestPost = (url, params) => {
  return axios.post(apiUrl + url, params);
};

export const apiRequestGetWithBearer = (url) => {
  const [user, setUser] = useState({});
  getValueFor("user", setUser);
  return axios.get(apiUrl + url, {
    headers: { Authorization: "Bearer" + user.access_token },
  });
};
