<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="userSaveHandle"
          >新增用户</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
          >批量删除</el-button
        >
        <el-select v-model="searchObj2" placeholder="请选择">
          <el-option
            v-for="item in roleDate"
            :key="item.value"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="searchObj1"
          placeholder="请输入昵称"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="primary" icon="el-icon-search" @click="handleClean"
          >清空</el-button
        >
        &nbsp;
        <a href="http://localhost:9527/user/exportUser" target="_blank">
          <el-button type="primary" icon="el-icon-search">导出</el-button>
        </a>
        &nbsp;
        <el-button type="primary" icon="el-icon-search" @click="importData"
          >导入</el-button
        >
      </div>
      <el-table
        :data="userData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column label="头像" align="center"
          ><template slot-scope="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.avatar"
              :preview-src-list="[scope.row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="fullName" label="昵称"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1" type="success">开启</el-tag>
            <el-tag v-if="scope.row.status != 1" type="danger">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="userUpdateHandle(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="userDeleteHandle(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="page"
        ></el-pagination>
      </div>
    </div>

    <!-- 更改用户信息弹出框 -->
    <el-dialog
      title="更改用户信息"
      :visible.sync="userUpdateVisible"
      width="30%"
    >
      <el-form
        ref="ruleForm"
        :model="userForm"
        label-width="70px"
        :rules="userRules"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9527/oss/uploadAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="fullName">
          <el-input v-model="userForm.fullName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userForm.roleId" placeholder="请选择">
            <el-option
              v-for="item in roleDate"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="userUpdate('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 新增用户弹出框 -->
    <el-dialog title="新增用户" :visible.sync="userSaveVisible" width="30%">
      <el-form
        ref="ruleForm"
        :model="userForm"
        label-width="70px"
        :rules="userRules"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9527/oss/uploadAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="fullName">
          <el-input v-model="userForm.fullName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userForm.roleId" placeholder="请选择">
            <el-option
              v-for="item in roleDate"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userSaveVisible = false">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上传用户excel弹出框 -->
    <el-dialog title="导入" :visible.sync="userImportVisible" width="480px">
      <el-form >
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:9527/user/importUser'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传excel文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserApi from "../api/user";
import RoleApi from "../api/role";
export default {
  name: "UserManage",
  data() {
    return {
      //昵称
      searchObj1: "",
      //角色名
      searchObj2: "",
      currentPage: 1,
      total: 0,
      pageSize: 10,
      userData: [],
      multipleSelection: [],
      delList: [],
      userSaveVisible: false,
      userUpdateVisible: false,
      userImportVisible: false,
      userForm: {
        id: "",
        username: "",
        password: "",
        avatar: "",
        fullName: "",
        mobile: "",
        email: "",
        status: "",
        roleId: "",
      },
      userRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        fullName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" },
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
      oldRoleId: "",
      roleDate: [],
    };
  },

  methods: {
    //查询所有的用户
    page(currentPage) {
      UserApi.findAll(
        currentPage,
        this.pageSize,
        this.searchObj1,
        this.searchObj2
      ).then((response) => {
        this.userData = response.data.data.records;
        this.currentPage = response.data.data.current;
        this.total = response.data.data.total;
        this.pageSize = response.data.data.size;
      });
      //得到所有的角色，来供选择
      RoleApi.findAll().then((response) => {
        this.roleDate = response.data.data.records;
      });
    },
    //新增前的操作
    userSaveHandle() {
      this.userForm = {};
      this.userSaveVisible = true;
    },
    //新增操作
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UserApi.singleSave(this.userForm).then((response) => {
            this.$message.success("新增成功");
            this.page(1);
            this.userSaveVisible = false;
          });
        } else {
          this.$message.error("输入的信息不正确");
          return false;
        }
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.page(1);
    },
    handleClean() {
      this.searchObj1 = "";
      this.searchObj2 = "";
      this.page(1);
    },
    // 删除操作(二次确认删除)
    userDeleteHandle(row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then((response) => {
          UserApi.singleDelete(row.id)
            .then((response) => {
              this.$message.success("删除成功");
              this.page(1);
            })
            .catch((response) => {
              this.$message.error("删除失败");
              this.page(1);
            });
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 二次确认删除
    delAllSelection() {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then((response) => {
          const length = this.multipleSelection.length;
          for (let i = 0; i < length; i++) {
            this.delList.push(this.multipleSelection[i].id);
          }
          UserApi.batchDelete(this.delList)
            .then((response) => {
              this.$message.success("删除成功");
              this.page(1);
              this.delList = [];
            })
            .catch((response) => {
              this.$message.error("删除失败");
              this.page(1);
              this.delList = [];
            });
        })
        .catch(() => {});
    },
    
    handleAvatarSuccess(response, file) {
      this.userForm.avatar = response.data

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
    // 更新前操作
    userUpdateHandle(row) {
      this.userForm.id = row.id;
      this.userForm.username = row.username;
      this.userForm.password = row.password;
      this.userForm.avatar = row.avatar;
      this.userForm.fullName = row.fullName;
      this.userForm.mobile = row.mobile;
      this.userForm.email = row.email;
      this.userForm.status = row.status;
      this.userForm.roleId = row.roleId;
      this.userUpdateVisible = true;
    },
    // 更新操作
    userUpdate(formName) {
      this.userUpdateVisible = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          UserApi.singleUpdate(this.userForm)
            .then((response) => {
              this.$message.success(`修改成功`);
              this.page(1);
            })
            .catch((response) => {
              this.$message.error(`修改失败`);
              this.page(1);
            });
        } else {
          this.$message.error("输入的信息不正确");
          return false;
        }
      });
    },
    //导入用户数据
    importData() {
      this.userImportVisible = true;
    },
    //上传成功调用
    onUploadSuccess() {
      this.userImportVisible = false;
      this.page(1);
    },
  },
  created() {
    this.page(1);
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
  height: 150px;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
