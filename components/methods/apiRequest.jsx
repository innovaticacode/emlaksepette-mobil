import axios from "axios";
import { getValueFor } from "./user";
export const apiUrl = "http://192.168.18.31:8000/api/";
export const frontEndUri = "http://192.168.18.31:8000/api/";
export const frontEndUriBase = "http://192.168.18.31:8000/";

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
