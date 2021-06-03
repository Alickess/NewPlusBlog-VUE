import axios from "../utils/axios";

export default {
  list(currentPage,pageSize, searchObj) {
    return axios({
      url: "/systemLog/list",
      method: "get",
      params: { currentPage, pageSize,searchObj },
    });
  },
}