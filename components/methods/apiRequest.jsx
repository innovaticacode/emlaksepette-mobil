import axios from "axios"
import { getValueFor } from "./user";
import { useState } from "react";
const apiUrl = "https://7f24-78-178-52-190.ngrok-free.app/api/";
export const frontEndUri = "https://emlaksepette.com/"


export const apiRequestGet = (url) => {
    return axios.get(apiUrl+url);
}

export const apiRequestPost = (url,params) => {
    return axios.post(apiUrl+url,params);
}

export const apiRequestGetWithBearer = (url) => {
    const [user,setUser] = useState({});
    getValueFor("user",setUser)
    console.log(user.access_token);
    return axios.get(apiUrl+url,{ headers: { Authorization: 'Bearer' + user.access_token } });
}