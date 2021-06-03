<template>
  <div class="smallcenter">
    <Header></Header>
    <div class="m-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor
            v-model="ruleForm.content"
            ref="md"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
          ></mavon-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >更新</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import BlogApi from "../api/blog";
export default {
  name: "BlogUpdate.vue",
  components: { Header },
  data() {
    return {
      ruleForm: {
        id: "",
        title: "",
        description: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          BlogApi.update(this.ruleForm).then((response) => {
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
    // 绑定@imgAdd event
    $imgAdd(pos, file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", file);
      console.log(pos);
      console.log(file);
      console.log(formdata);
      this.$axios({
        url: "http://localhost:9527/oss/uploadBlogImage",
        method: "post",
        data: formdata,
      }).then((res) => {
        this.$refs.md.$img2Url(pos, res.data.data);
      });
    },
    $imgDel(pos) {},
  },
  created() {
    const blogId = this.$route.params.blogId;
    if (blogId) {
      BlogApi.detail(blogId).then((response) => {
        this.ruleForm.id = blogId;
        this.ruleForm.title = response.data.data.title;
        this.ruleForm.description = response.data.data.description;
        this.ruleForm.content = response.data.data.content;
      });
    }
  },
};
</script>

<style scoped>
.m-content {
  text-align: center;
}
.smallcenter {
  max-width: 960px;
  margin: 0 auto;
}
</style>
