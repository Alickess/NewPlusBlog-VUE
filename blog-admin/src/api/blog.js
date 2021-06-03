import axios from "../utils/axios";

export default {
  list(currentPage, pageSize,searchObj) {
    return axios({
      url: `/blog/list`,
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
      url: `/blog/${id}`,
      method: "get",
    });
  },
  update(blog) {
    return axios({
      url: `/blog/update`,
      method: "post",
      data: blog,
    });
  },
  save(blog) {
    return axios({
      url: `/blog/save`,
      method: "post",
      data: blog,
    });
  },
  deleteById(blog) {
    return axios({
      url: `/blog/deleteById`,
      method: "delete",
      data: blog,
    });
  },
  deleteByIds(idList) {
    return axios({
      url: `/blog/deleteByIds`,
      method: "delete",
      data: idList,
    });
  },
};

