import { apiRequestGetWithBearer } from "../components/methods/apiRequest";

export const userApiService = () => {
    return apiRequestGetWithBearer('current_user')
    .then((res) => {
      return res.data;  // Gelen kullanıcı verisini döndür
    })
    .catch((err) => {
      throw err;  // Hata durumunda hatayı fırlat
    });
} 

export enum endpoints {
    CURRENT_USER = "current_user/"
};