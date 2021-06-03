import axios from "../utils/axios";

export default {
  findAll(currentPage, pageSize,searchObj1,searchObj2) {
    return axios({
      url: "/user/findAll",
      method: "get",
      params: { currentPage,pageSize, searchObj1 ,searchObj2},
    });
  },
  findById(id) {
    return axios({
      url: `/user/findById`,
      method: "get",
      params: { id },
    });
  },
  singleSave(userVO) {
    return axios({
      url: `/user/singleSave`,
      method: "post",
      data: userVO,
    });
  },
  singleUpdate(userVO) {
    return axios({
      url: `/user/singleUpdate`,
      method: "put",
      data: userVO,
    });
  },
  singleDelete(id) {
    return axios({
      url: `/user/singleDelete`,
      method: "delete",
      params: {id},
    });
  },
  batchDelete(idList) {
    return axios({
      url: `/user/batchDelete`,
      method: "delete",
      data: idList,
    });
  },
};
