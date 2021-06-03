import axios from "../utils/axios";

export default {
  list(currentPage, pageSize, searchObj) {
    return axios({
      url: `/permission/list`,
      method: "get",
      params: {
        currentPage,
        pageSize,
        searchObj,
      },
    });
  },
  detail(id) {
    return axios({
      url: `/permission/${id}`,
      method: "get",
    });
  },
  save(permission) {
    return axios({
      url: `/permission/save`,
      method: "post",
      data: permission,
    });
  },
  update(permission) {
    return axios({
      url: `/permission/update`,
      method: "put",
      data: permission,
    });
  },
  singleDelete(id) {
    return axios({
      url: `/permission/singleDelete`,
      method: "delete",
      params: { id },
    });
  },
  batchDelete(idList) {
    return axios({
      url: `/permission/batchDelete`,
      method: "delete",
      data: idList,
    });
  },
};
