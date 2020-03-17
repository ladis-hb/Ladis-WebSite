/* jshint esversion:8 */
async function ajax(axios, { url, params }) {
  const { data } = await axios({
    method: "get",
    url: url,
    baseURL: "http://www.ladishb.com",
    params
  });
  return data;
}
//
export const GetHomeNews = axios => {
  return ajax(axios, { url: "/api/GetHomeNews" });
};
// //获取经销商列表子类
export const GetBuyList = (axios, { city }) => {
  return ajax(axios, { url: "/api/Get_buy_li", params: { city } });
};
// 获取信息
export const GeneralGetInfo = (
  axios,
  { table, title, parent, isNews = false }
) => {
  return ajax(axios, {
    url: "/api/Get_arg",
    params: { table, title, parent, isNews }
  });
};
// 配置编辑
export const SendNewCaseEdit = (axios, params) => {
  return ajax(axios, { url: "/edit/SendNewCaseEdit", params });
};

export const Get_pic_Source = (axios, params) => {
  return ajax(axios, { url: "/edit/Get_file_Source", params });
};
export const Add_Dealers = (axios, params) => {
  return ajax(axios, { url: "/edit/dealers", params });
};

export const Add_Product = (axios, params) => {
  return ajax(axios, { url: "/edit/product", params });
};

export const Add_Problem = (axios, params) => {
  return ajax(axios, { url: "/edit/problem", params });
};
export const Add_Soft = (axios, params) => {
  return ajax(axios, { url: "/edit/soft", params });
};

export const setCarousel = (axios, params) => {
  return ajax(axios, { url: "/edit/setCarousel", params });
};

export const setAbout = (axios, params) => {
  return ajax(axios, { url: "/edit/setAbout", params });
};

export const getAbout = (axios, params) => {
  return ajax(axios, { url: "/edit/getAbout", params });
};
