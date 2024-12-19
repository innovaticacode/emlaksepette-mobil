import {
  apiRequestGetWithBearer,
  apiRequestPostWithBearer,
} from "../components/methods/apiRequest";

/**
 * Fetches the current user data from the server.
 *
 * @function
 * @returns {Promise<Object>} - A promise that resolves to the user data.
 * @throws {Error} - Throws an error if the request fails.
 */

export const userApiService = () => {
  return apiRequestGetWithBearer("current_user")
    .then((res) => {
      return res.data; // Gelen kullanıcı verisini döndür
    })
    .catch((err) => {
      throw err; // Hata durumunda hatayı fırlat
    });
};

/**
 * Sends a payment request with the provided details.
 *
 * @function
 * @param {Object} params - The parameters for the payment request.
 * @param {number} params.bank_id - The ID of the bank to which the payment is made.
 * @param {Pdf} params.pdf - The PDF document to be uploaded (optional).
 * @param {string} params.payableAmount - The amount to be paid.
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws {Error} - Throws an error if the request fails.
 */

export const payEft = (params: {
  bank_id: number;
  pdf: Pdf;
  payableAmount: string;
}) => {
  var formData = new FormData();
  formData.append("bank_id", params.bank_id.toString());
  formData.append("payableAmount", params.payableAmount);

  if (params.pdf) {
    formData.append("pdf", {
      uri: params.pdf.uri,
      name: params.pdf.name || "application/pdf",
      type: params.pdf.mimeType || "document.pdf",
    } as unknown as Blob);
  }

  return apiRequestPostWithBearer(endpoints.PAY_EFT, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Checks the validity of a reference code by querying the server.
 *
 * @function
 * @param {number} referanceCode - The reference code to validate.
 * @returns {Promise<Object>} - A promise that resolves to the server's response.
 * @throws {Error} - Throws an error if the request fails.
 */

export const checkReferanceCode = (referanceCode: number) => {
  return apiRequestGetWithBearer(
    endpoints.CHECK_REFERANCE_CODE + "/" + referanceCode
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Enum representing API endpoints.
 *
 * @readonly
 * @enum {string}
 */

export enum endpoints {
  CURRENT_USER = "current_user/",
  PAY_EFT = "pay_eft",
  CHECK_REFERANCE_CODE = "check_referance_code",
}

/**
 * Represents a PDF document.
 *
 * @typedef {Object} Pdf
 * @property {string} uri - The URI of the PDF document.
 * @property {string} name - The name of the PDF document.
 * @property {string} mimeType - The MIME type of the PDF document.
 */

type Pdf = {
  uri: string;
  name: string;
  mimeType: string;
};
