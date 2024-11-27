import axios from "axios";
import { getValueFor } from "./user";
import { useState } from "react";
export const apiUrl = "https://emlaksepette.com/api/";
export const frontEndUri = "https://emlaksepette.com/api/";
export const frontEndUriBase = "https://emlaksepette.com/";

export const apiRequestGet = (url) => {
  return axios.get(apiUrl + url);
};

export const apiRequestPost = (url, params) => {
  return axios.post(apiUrl + url, params);
};

export const apiRequestGetWithBearer = async (url) => {
  let user = {};
  // getValueFor fonksiyonunu async/await ile bekliyoruz
  await getValueFor("user", (res) => {
    user = res; // access_token değerini alıyoruz
  });
  // Eğer token alınmışsa isteği yapıyoruz
  if (user && user.access_token) {
    return axios.get(apiUrl + url, {
      headers: { Authorization: "Bearer " + user.access_token },
    });
  } else {
    console.error("Access token bulunamadı");
    throw new Error("Kullanıcı access token'ı bulunamadı.");
  }
};
export const apiRequestPostWithBearer = async (url, params) => {
  await getValueFor("user", (res) => {
    user = res; // access_token değerini alıyoruz
  });
  // Eğer token alınmışsa isteği yapıyoruz
  if (user && user.access_token) {
    console.log(user.access_token);
    console.log("qqq");
    return axios.post(apiUrl + url, params, {
      headers: {
        Authorization: "Bearer " + user.access_token,
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    console.error("Access token bulunamadı");
    throw new Error("Kullanıcı access token'ı bulunamadı.");
  }
};

export const apiRequestDeleteWithBearer = async (url, params) => {
  await getValueFor("user", (res) => {
    user = res; // access_token değerini alıyoruz
  });
  // Eğer token alınmışsa isteği yapıyoruz
  if (user && user.access_token) {
    return axios.delete(apiUrl + url, params, {
      headers: { Authorization: "Bearer " + user.access_token },
    });
  } else {
    console.error("Access token bulunamadı");
    throw new Error("Kullanıcı access token'ı bulunamadı.");
  }
};
