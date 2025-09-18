import axios from "axios";
import CryptoJS from "crypto-js";

const generateSHA1 = (data) => {
  return CryptoJS.SHA1(data).toString(CryptoJS.enc.Hex);
};

const generateSignature = (publicId, apiSecret) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const handleDelete = (publicId) => {
  const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;
  const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;
  const apiSecret = import.meta.env.VITE_REACT_APP_APISECRET;
  const timestamp = new Date().getTime();
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  axios
    .post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    })
    .then((response) => {
      console.log("Image deleted from cloudinary: ", response);
    })
    .catch((error) => {
      console.error("Unable to delete image: ", error);
    });
};
