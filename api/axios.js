/* jshint esversion:8 */
import axios from "axios";

async function ajax({ method = "get", url, baseURL, params }) {
  let { data } = await axios({
    method: method,
    url: url,
    baseURL: baseURL || "",
    params: Object.assign(getToken(), params || {})
  });
  return data;
}

function getToken() {
  return {
    user: sessionStorage.getItem("user") || "",
    token: sessionStorage.getItem("token") || ""
  };
}
export const SendNewCaseEdit = params => {
  return ajax({ url: "/edit/SendNewCaseEdit", params });
};

export const Get_pic_Source = params => {
  return ajax({ url: "/edit/Get_file_Source", params });
};
export const Add_Dealers = params => {
  return ajax({ url: "/edit/dealers", params });
};

export const Add_Product = params => {
  return ajax({ url: "/edit/product", params });
};

export const Add_Problem = params => {
  return ajax({ url: "/edit/problem", params });
};
export const Add_Soft = params => {
  return ajax({ url: "/edit/soft", params });
};
