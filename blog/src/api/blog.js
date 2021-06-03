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
  myList(currentPage, searchObj,userId) {
    return axios({
      url: `/blog/myList`,
      method: "get",
      params: {
        currentPage,
        searchObj,
        userId
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
};
