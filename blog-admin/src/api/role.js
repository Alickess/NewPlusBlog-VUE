import axios from "../utils/axios";

export default {
  findAll() {
    return axios({
      url: "/role/findAll",
      method: "get",
    });
  },
  findById(id) {
    return axios({
      url: `/role/findById`,
      method: "get",
      params: { id },
    });
  },
  singleSave(roleVO) {
    return axios({
      url: `/role/singleSave`,
      method: "post",
      data: roleVO,
    });
  },
  singleUpdate(roleVO) {
    return axios({
      url: `/role/singleUpdate`,
      method: "put",
      data: roleVO,
    });
  },
  singleDelete(id) {
    return axios({
      url: `/role/singleDelete`,
      method: "delete",
      params: {id},
    });
  },
};
