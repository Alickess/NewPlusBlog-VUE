<template>
  <div class="smallcenter">
    <Header></Header>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>

      <router-link :to="{ name: 'BlogUpdate', params: { blogId: blog.id } }">
        <el-button type="primary" size="small" v-if="ownBlog">编辑</el-button>
      </router-link>
      /
      <el-button type="danger" size="small" v-if="ownBlog" @click="handleDelete"
        >删除</el-button
      >

      <el-divider></el-divider>
      <div
        class="markdown-body"
        v-html="blog.content"
      ></div>
    </div>
  </div>
</template>

<script>
import "github-markdown-css";
import Header from "../components/Header";
import BlogApi from "../api/blog";
export default {
  name: "BlogDetail.vue",
  components: { Header },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        content: "",
      },
      ownBlog: false,
    };
  },
  methods: {
    handleDelete() {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then((response) => {
        BlogApi.deleteById(this.blog)
          .then((response) => {
            this.$message.success("删除成功");
            this.$router.push("/blogs");
          })
          .catch((response) => {
            this.$message.error("删除失败");
            this.$router.push("/blogs");
          });
      });
    },
    
  },
  created() {
    const blogId = this.$route.params.blogId;
    console.log(blogId);
    BlogApi.detail(blogId).then((response) => {
      const blog = response.data.data;
      this.blog.id = blog.id;
      this.blog.title = blog.title;

      var MardownIt = require("markdown-it");
      var md = new MardownIt();

      var result = md.render(blog.content);
      this.blog.content = result;
      this.ownBlog = blog.userId === this.$store.getters.getUser.id;
    });
  },
};
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
.smallcenter {
  max-width: 960px;
  margin: 0 auto;
}
</style>
