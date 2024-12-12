import axios from "axios";
import { getValueFor } from "./user";
export const apiUrl = "https://private.emlaksepette.com/api/";
export const frontEndUri = "https://private.emlaksepette.com/api/";
export const frontEndUriBase = "https://private.emlaksepette.com/";
export const socketIO = "https://ws.emlaksepette.com/";

export const apiRequestGet = (url) => {
  return axios.get(apiUrl + url);
};

export const apiRequestPost = (url, params) => {
  return axios.post(apiUrl + url, params);
};

/**
 * Makes a GET request to the specified URL with a Bearer token.
 *
 * @async
 * @function
 * @param {string} url - The endpoint to make the GET request to.
 * @returns {Promise} - The Axios promise for the GET request.
 * @throws {Error} - Throws an error if the access token is not found.
 */

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

/**
 * Sends a POST request to the specified API endpoint, including an Authorization header with a Bearer token and the provided data.
 *
 * @async
 * @function
 * @param {string} url - The relative endpoint to append to the base API URL.
 * @param {Object|FormData} params - The data payload to send in the POST request. Can be an object or FormData.
 * @returns {Promise<Object>} - A promise resolving to the API response.
 * @throws {Error} - Throws an error if the user token is not found, the request fails, or the response contains an error.
 */

export const apiRequestPostWithBearer = async (url, params) => {
  try {
    const user = await new Promise((resolve, reject) => {
      getValueFor("user", (res) => {
        if (res && res.access_token) {
          resolve(res);
        } else {
          reject(new Error("Kullanıcı access token'ı bulunamadı."));
        }
      });
    });

    const isFormData = params instanceof FormData;

    const response = await axios.post(apiUrl + url, params, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        ...(isFormData && { "Content-Type": "multipart/form-data" }),
      },
    });

    return response;
  } catch (error) {
    console.error("API İsteği Hatası:");
    console.error(`URL: ${apiUrl + url}`);
    console.error("Params:", params);

    if (error.response) {
      console.error("Sunucu Yanıtı Hatası:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      console.error("Sunucuya Ulaşamayan İstek Hatası:", error.request);
    } else {
      console.error("Hata Mesajı:", error.message);
    }

    console.error("Axios Config:", error.config);

    throw new Error(error.response?.data?.message || "Ağ veya Sunucu Hatası.");
  }
};
