import axios from "axios";
import { getValueFor } from "./user";
export const apiUrl = "https://private.emlaksepette.com/api/";
export const frontEndUri = "https://private.emlaksepette.com/api/";
export const frontEndUriBase = "https://private.emlaksepette.com/";

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

export const apiRequestPostWithBearer = async (url,params) => {
  await getValueFor("user", (res) => {
    user = res; // access_token değerini alıyoruz
  });

  // Eğer token alınmışsa isteği yapıyoruz
  if (user && user.access_token) {
    return axios.post(apiUrl + url, params ,{
      headers: { Authorization: "Bearer " + user.access_token },
    });
  } else {
    console.error("Access token bulunamadı");
    throw new Error("Kullanıcı access token'ı bulunamadı.");
  }
}
