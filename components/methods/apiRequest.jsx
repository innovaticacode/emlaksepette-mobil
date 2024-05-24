import axios from "axios"
import { getValueFor } from "./user";
import { useState } from "react";
export const apiUrl = "https://test.emlaksepette.com/api/";
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
    return axios.get(apiUrl+url,{ headers: { Authorization: 'Bearer' + user.access_token } });
}


export const apiRequestPostWithBearer = (url,params) => {
    const [userx,setUserx] = useState({});
    console.log("asd");
    getValueFor("user",setUserx)
    return axios.post(apiUrl+url,params,{ headers: { Authorization: 'Bearer' + e.access_token } });
}