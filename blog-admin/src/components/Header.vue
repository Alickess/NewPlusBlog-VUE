<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">新加博客后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <el-avatar :size="40" :src="user.avatar"></el-avatar>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" >
          <span class="el-dropdown-link">
            {{ user.fullName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="https://www.baidu.com" style="text-decoration:none">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item ><span @click="logout">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        fullName: "",
        avatar: "",
        id: "0",
      },
      collapse: false,
    };
  },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      this.$bus.emit('collapse', this.collapse);
    },
    logout() {
      this.$store.commit("REMOVE_INFO");
      this.$router.push("/login");
      console.log(this);
    },
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
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
