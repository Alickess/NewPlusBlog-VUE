<template>
  <div class="smallcenter">
    <div class="m-content">
      <el-form
        :model="blogForm"
        :rules="blogRules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="blogForm.title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="blogForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor
            v-model="blogForm.content"
            ref="md"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
          ></mavon-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="blogUpdate('ruleForm')"
            >更新</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import BlogApi from "../api/blog";
export default {
  name: "BlogDetail.vue",
  data() {
    return {
      blogForm: {
        id: "",
        title: "",
        description: "",
        content: "",
      },
      blogId: this.$route.params.blogId,
      blogRules: {
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
    blogUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          BlogApi.update(this.blogForm).then((response) => {
            this.$message.success("更新成功");
            this.$router.push("/blog");
          });
        } else {
          this.$message.error("输入的信息不正确");
          return false;
        }
      });
    },
    // 绑定@imgAdd event,将图片上传到服务器
    $imgAdd(pos, file) {
      var formdata = new FormData();
      formdata.append("image", file);
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
  // computed: {
  //   reversedMessage() {
  //     BlogApi.detail(this.blogId).then((response) => {
  //       this.blogForm.id =this.blogId;
  //       this.blogForm.title = response.data.data.title;
  //       this.blogForm.description = response.data.data.description;
  //       this.blogForm.content = response.data.data.content;
  //     });
  //     return this.blogForm;
  //   },
  // },
  // watch: {
  //   blogId: {
  //     getBlog() {
  //       console.log(this.blogId);
  //       BlogApi.detail(this.blogId).then((response) => {
  //         this.blogForm.id = this.blogId;
  //         this.blogForm.title = response.data.data.title;
  //         this.blogForm.description = response.data.data.description;
  //         this.blogForm.content = response.data.data.content;
  //       });
  //     },
  //     immediate: true,
  //   },
  // },
  mounted() {
    console.log("id:",this.$route.params.blogId)
    BlogApi.detail(this.blogId).then((response) => {
      this.blogForm.id = this.blogId;
      this.blogForm.title = response.data.data.title;
      this.blogForm.description = response.data.data.description;
      this.blogForm.content = response.data.data.content;
    });
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
