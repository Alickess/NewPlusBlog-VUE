<template>
  <div class="m-content">
    <h3>欢迎来到NewPlus博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.fullName }}</div>
    </div>

    <div class="maction">
      <span><el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="primary" href="/myBlogs">我的博客</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/save">发表文章</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span
        ><el-link type="warning"
          ><router-link
            style="text-decoration:none"
            :to="{ name: 'UserUpdate', params: { userId: user.id } }"
            >更改信息
          </router-link></el-link
        ></span
      >
      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"
        ><el-link type="primary" href="/login">登陆</el-link></span
      >
      <span v-show="hasLogin"
        ><el-link type="danger" @click="logout">退出</el-link></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: {
        fullName: "请先登陆",
        avatar: "",
        id: "0",
      },
      hasLogin: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("REMOVE_INFO");
      this.$router.push("/login");
      console.log(this);
    }
  },
  created() {
    if (this.$store.getters.getUser != null) {
      this.user.fullName = this.$store.getters.getUser.fullName;
      this.user.avatar = this.$store.getters.getUser.avatar;
      this.user.id = this.$store.getters.getUser.id;
      this.hasLogin = true;
    }
  },
};
</script>

<style scoped>
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

.maction {
  margin: 10px 0;
}
</style>
