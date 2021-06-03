import axios from "axios";
import Element from "element-ui";
import router from "../router";
import store from "../store";

axios.defaults.baseURL = "http://localhost:9527";

//前置拦截,request拦截器
axios.interceptors.request.use((config) => {
  if (sessionStorage.getItem("token")) {
    config.headers["Authorization"] =
      "Bearer" + sessionStorage.getItem("token"); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
});

//后置拦截,response拦截器
axios.interceptors.response.use(
  (respone) => {
    let res = respone.data;
    if (res.code === 200) {
      return respone;
    } else {
      Element.Message.error("发生错误", { duration: 3 * 1000 });
      return Promise.reject(respone.data.message);
    }
  },
  (error) => {
    console.log(error);
    if (error.response.data) {
      error.message = error.response.data.message;
    }

    if (error.response.status === 401) {
      store.commit("REMOVE_INFO");
      router.push("/login");
    }

    Element.Message.error(error.message, { duration: 3 * 1000 });
    return Promise.reject(error);
  }
);
export default axios;
