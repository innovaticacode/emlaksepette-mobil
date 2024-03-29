import axios from "axios"
const apiUrl = "https://emlaksepette.com/api/";

export const apiRequestGet = (url) => {
    return axios.get(apiUrl+url);
}