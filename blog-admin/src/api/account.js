import axios from "../utils/axios";

export default {
  login(user) {
    return axios({
      url: "/account/login",
      method: "post",
      data: user,
    });
  },
};
