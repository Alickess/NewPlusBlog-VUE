<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 权限管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="permissionSaveHandle"
          >新增权限</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
          >批量删除</el-button
        >
        <el-input
          v-model="searchObj"
          placeholder="请输入代码"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="permissionData"
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
        <el-table-column prop="code" label="代码"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="url" label="地址"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="permissionUpdateHandle(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="permissionDeleteHandle(scope.row)"
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

    <!-- 更改权限信息弹出框 -->
    <el-dialog
      title="更改权限信息"
      :visible.sync="permissionUpdateVisible"
      width="30%"
    >
      <el-form
        ref="ruleForm"
        :model="permissionForm"
        label-width="70px"
        :rules="permissionRules"
        class="demo-ruleForm"
      >
        <el-form-item label="代码" prop="code">
          <el-input v-model="permissionForm.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="permissionForm.description"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input v-model="permissionForm.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permissionUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="permissionUpdate('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 新增权限弹出框 -->
    <el-dialog
      title="更改权限信息"
      :visible.sync="permissionSaveVisible"
      width="30%"
    >
      <el-form
        ref="ruleForm"
        :model="permissionForm"
        label-width="70px"
        :rules="permissionRules"
        class="demo-ruleForm"
      >
        <el-form-item label="代码" prop="code">
          <el-input v-model="permissionForm.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="permissionForm.description"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input v-model="permissionForm.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permissionSaveVisible = false">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PermissionApi from "../api/permission";
export default {
  data() {
    return {
      searchObj: "",
      currentPage: 1,
      total: 0,
      pageSize: 10,
      permissionData: [],
      multipleSelection: [],
      delList: [],
      permissionUpdateVisible: false,
      permissionSaveVisible: false,
      permissionForm: {
        id: "",
        code: "",
        description: "",
        url: "",
      },
      permissionRules: {
        code: [{ required: true, message: "请输入代码名", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        url: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  methods: {
    //查询所有的权限
    page(currentPage) {
      PermissionApi.list(currentPage, this.pageSize, this.searchObj).then(
        (response) => {
          this.permissionData = response.data.data.records;
          this.currentPage = response.data.data.current;
          this.total = response.data.data.total;
          this.pageSize = response.data.data.size;
        }
      );
    },
    //新增前的操作
    permissionSaveHandle() {
      this.permissionForm = {};
      this.permissionSaveVisible = true;
    },
    //新增操作
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          PermissionApi.save(this.permissionForm).then((response) => {
            this.$message.success("新增成功");
            this.page(1);
            this.permissionSaveVisible = false;
          });
        } else {
          this.$message.error("输入的信息不正确");
          return false;
        }
      });
    },
    // 删除操作(二次确认删除)
    permissionDeleteHandle(row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then((response) => {
          PermissionApi.singleDelete(row.id)
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
    //多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除选择的记录(二次确认删除)
    delAllSelection() {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then((response) => {
          const length = this.multipleSelection.length;
          for (let i = 0; i < length; i++) {
            this.delList.push(this.multipleSelection[i].id);
          }
          PermissionApi.batchDelete(this.delList)
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
    // 触发搜索按钮
    handleSearch() {
      this.page(1, this.pageSize);
    },
    // 更新前的操作
    permissionUpdateHandle(row) {
      this.permissionForm.id = row.id;
      this.permissionForm.code = row.code;
      this.permissionForm.description = row.description;
      this.permissionForm.url = row.url;
      this.permissionUpdateVisible = true;
    },
    // 更新操作
    permissionUpdate(formName) {
      this.permissionUpdateVisible = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          PermissionApi.update(this.permissionForm)
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
.handle-input {
  width: 300px;
  display: inline-block;
}
.mr10 {
  margin-right: 10px;
}
</style>
