<template>
  <div class="smallcenter">
    <Header></Header>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="昵称" prop="fullName">
        <el-input v-model="ruleForm.fullName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9527/oss/uploadAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即更改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Header from "../components/Header";
import userApi from "../api/user";
export default {
  name: "UserUpdate.vue",
  components: { Header },
  data() {
    return {
      ruleForm: {
        id: 0,
        fullName: "",
        password: "",
        avatar: "",
        mobile: "",
        email: "",
        roleId:"",
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        fullName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi.singleUpdate(this.ruleForm).then((response) => {
            const userInfo = response.data.data;
            this.$store.commit("SET_USERINFO", userInfo);
            this.$message.success("更新成功");
            this.$router.push("/blogs");
          });
        } else {
          this.$message.error("输入的信息不正确");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(response, file) {
      this.ruleForm.avatar = response.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    const userId = this.$route.params.userId;
    if (userId) {
      userApi.findById(userId).then((response) => {
        this.ruleForm.id = userId;
        this.ruleForm.fullName = response.data.data.fullName;
        this.ruleForm.password = response.data.data.password;
        this.ruleForm.avatar = response.data.data.avatar;
        this.ruleForm.mobile = response.data.data.mobile;
        this.ruleForm.email = response.data.data.email;
        this.ruleForm.roleId = response.data.data.roleId;
      });
    }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.smallcenter {
  max-width: 960px;
  margin: 0 auto;
}
</style>
