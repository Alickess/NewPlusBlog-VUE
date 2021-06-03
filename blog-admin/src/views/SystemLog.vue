<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 系统日志
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="searchObj"
          placeholder="请输入账号"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="systemLogData"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="operation" label="操作"></el-table-column>
        <el-table-column prop="method" label="方法"></el-table-column>
        <el-table-column prop="ip" label="ip地址"></el-table-column>
        <el-table-column prop="createTime" label="操作时间"></el-table-column>
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
import SystemLogApi from "../api/systemLog";
export default {
  data() {
    return {
      searchObj: "",
      currentPage: 1,
      total: 0,
      pageSize: 10,
      systemLogData: [],
    };
  },
  methods: {
    //查询所有的日志
    page(currentPage) {
      SystemLogApi.list(currentPage, this.pageSize, this.searchObj).then(
        (response) => {
          this.systemLogData = response.data.data.records;
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
</style>
