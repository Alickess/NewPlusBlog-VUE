import axios from "../utils/axios";

export default {
  singleUpdate(user) {
    return axios({
      url: `/user/singleUpdate`,
      method: "put",
      data: user,
    });
  },
  findById(id) {
    return axios({
      url: `/user/findById`,
      method: "get",
      params: {
        id,
      },
    });
  },
  findByUsername(username) {
    return axios({
      url: `/user/findByUsername`,
      method: "get",
      params: {
        username,
      },
    });
  },
};
