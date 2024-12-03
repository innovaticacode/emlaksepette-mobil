import { apiRequestGetWithBearer, apiRequestPostWithBearer } from "../components/methods/apiRequest";

export const userApiService = () => {
    return apiRequestGetWithBearer('current_user')
    .then((res) => {
      return res.data;  // Gelen kullanıcı verisini döndür
    })
    .catch((err) => {
      throw err;  // Hata durumunda hatayı fırlat
    });
} 

export const payEft = (params : {
  bank_id : number,
  pdf : ArrayBuffer,
  payableAmount : string
}) => {
  var formData = new FormData();

  formData.append('bank_id',params.bank_id.toString())
  const pdfBlob = new Blob([params.pdf], { type: 'application/pdf' });
  formData.append('pdf', pdfBlob, 'document.pdf');
  formData.append('payableAmount',params.payableAmount)

  return apiRequestPostWithBearer(endpoints.PAY_EFT,formData).then((res) => {
    return res
  }).catch((err) => {
    throw err
  })
}

export const checkReferanceCode = (referanceCode : number) => {
  return apiRequestGetWithBearer(endpoints.CHECK_REFERANCE_CODE+'/'+referanceCode).then((res) => {
    return res
  }).catch((err) => {
    throw err
  })
}

export enum endpoints {
  CURRENT_USER = "current_user/",
  PAY_EFT = "pay_eft",
  CHECK_REFERANCE_CODE = 'check_referance_code'
};