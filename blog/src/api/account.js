import axios from "../utils/axios";

export default {
  login(user) {
    return axios({
      url: "/account/login",
      method: "post",
      data: user,
    });
  },
  register(user) {
    return axios({
      url: "/account/register",
      method: "post",
      data: user,
    });
  },
};
