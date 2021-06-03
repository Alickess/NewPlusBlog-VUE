<template>
  <div class="smallcenter">
    <Header></Header>

    <div class="block">
      <el-timeline>
        <el-timeline-item
          :timestamp="blog.createTime"
          placement="top"
          v-for="blog in blogs"
          :key="blog.id"
        >
          <el-card>
            <h4>
              <router-link
                :to="{ name: 'BlogDetail', params: { blogId: blog.id } }"
              >
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination
        class="mpage"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import BlogApi from "../api/blog";
export default {
  name: "Blogs.vue",
  components: { Header },
  data() {
    return {
      searchObj: "",
      currentPage: 1,
      total: 0,
      pageSize: 5,
      blogs: [],
    };
  },
  methods: {
    page(currentPage) {
      BlogApi.list(currentPage,this.pageSize,this.searchObj).then((response) => {
        this.blogs = response.data.data.records;
        this.currentPage = response.data.data.current;
        this.total = response.data.data.total;
        this.pageSize = response.data.data.size;
      });
    },
  },
  created() {
    this.page(1);
  },
};
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
  /*max-width: 50%;*/
}
.smallcenter {
  max-width: 960px;
  margin: 0 auto;
}
</style>
