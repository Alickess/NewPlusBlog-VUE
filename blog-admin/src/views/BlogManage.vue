<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 博客管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
          >批量删除</el-button
        >
        <el-input
          v-model="searchObj"
          placeholder="请输入标题"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="blogData"
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
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
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
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.row)"
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
  </div>
</template>

<script>
import BlogApi from "../api/blog";
export default {
  name: "UserManage",
  data() {
    return {
      searchObj: "",
      currentPage: 1,
      total: 0,
      pageSize: 10,
      blogData: [],
      multipleSelection: [],
      delList: [],
    };
  },
  methods: {
    //查询所有的博客
    page(currentPage) {
      BlogApi.list(currentPage, this.pageSize, this.searchObj).then(
        (response) => {
          this.blogData = response.data.data.records;
          this.currentPage = response.data.data.current;
          this.total = response.data.data.total;
          this.pageSize = response.data.data.size;
        }
      );
    },
    // 触发搜索按钮
    handleSearch() {
      this.page(1);
    },
    // 删除操作
    handleDelete(row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then((response) => {
          BlogApi.deleteById(row)
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

    delAllSelection() {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then((response) => {
          const length = this.multipleSelection.length;
          for (let i = 0; i < length; i++) {
            this.delList.push(this.multipleSelection[i].id);
          }
          BlogApi.deleteByIds(this.delList)
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

    //同步
    // async delAllSelection() {
    //   // 二次确认删除

    //   const length = this.multipleSelection.length;
    //   for (let i = 0; i < length; i++) {
    //     this.delList.push(this.multipleSelection[i].id);
    //   }

    //   const { data } = await BlogApi.deleteByIds(this.delList);
    //   this.$message.success("删除成功");
    //   this.page(1);
    //   this.delList = [];

    //   if (!data.code == 200) {
    //     this.$message.error("删除失败");
    //     this.page(1);
    //     this.delList = [];
    //   }
    // },

    // 编辑操作
    handleEdit(row) {
      const blogId = row.id;
      console.log(blogId);
      this.$router.push({ name: "BlogDetail", params: { blogId } });
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
</style>
