<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img :src="user.avatar" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ user.fullName }}</div>
              <div>{{ roleName }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2021/5/25</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>宁波</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:252px;">
          <div slot="header" class="clearfix">
            <span>语言详情</span>
          </div>
          Java
          <el-progress :percentage="55" color="#42b983"></el-progress>Vue
          <el-progress :percentage="23" color="#f1e05a"></el-progress>JavaScript
          <el-progress :percentage="14"></el-progress>Css
          <el-progress :percentage="8" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>博客数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:403px;">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >添加</el-button
            >
          </div>
          <el-table :show-header="false" :data="todoList" style="width:100%;">
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div
                  class="todo-item"
                  :class="{ 'todo-item-del': scope.row.status }"
                >
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="bar"
            class="schart"
            canvasId="bar"
            :options="options"
          ></schart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart
            ref="line"
            class="schart"
            canvasId="line"
            :options="options2"
          ></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import UserApi from "../api/user";
export default {
  name: "dashboard",
  components: { Schart },
  data() {
    return {
      user: {
        id: 0,
        fullName: "",
        avatar: "",
      },
      roleName: "",
      todoList: [
        {
          title: "新加博客上线",
          status: false,
        },
        {
          title: "新加博客内容增加",
          status: false,
        },
        {
          title: "新加博客框架的升级",
          status: false,
        },
        {
          title: "新加博客各个细节的完善",
          status: false,
        },
        {
          title: "新加博客发布到github上",
          status: true,
        },
        {
          title: "新加博客基本功能完善",
          status: true,
        },
      ],
      data: [
        {
          name: "2018/09/04",
          value: 1083,
        },
        {
          name: "2018/09/05",
          value: 941,
        },
        {
          name: "2018/09/06",
          value: 1139,
        },
        {
          name: "2018/09/07",
          value: 816,
        },
        {
          name: "2018/09/08",
          value: 327,
        },
        {
          name: "2018/09/09",
          value: 228,
        },
        {
          name: "2018/09/10",
          value: 1065,
        },
      ],
      options: {
        type: "bar",
        title: {
          text: "最近一周各类博客增加数量",
        },
        xRorate: 25,
        labels: ["周一", "周二", "周三", "周四", "周五"],
        datasets: [
          {
            label: "科普",
            data: [234, 278, 270, 190, 230],
          },
          {
            label: "娱乐",
            data: [164, 178, 190, 135, 160],
          },
          {
            label: "日常",
            data: [144, 198, 150, 235, 120],
          },
        ],
      },
      options2: {
        type: "line",
        title: {
          text: "最近几个月各类博客增加数量",
        },
        labels: ["6月", "7月", "8月", "9月", "10月"],
        datasets: [
          {
            label: "科普",
            data: [234, 278, 270, 190, 230],
          },
          {
            label: "娱乐",
            data: [164, 178, 150, 135, 160],
          },
          {
            label: "日常",
            data: [74, 118, 200, 235, 90],
          },
        ],
      },
    };
  },
  methods: {},
  created() {
    if (this.$store.getters.getUser != null) {
      this.user.fullName = this.$store.getters.getUser.fullName;
      this.user.avatar = this.$store.getters.getUser.avatar;
      this.user.id = this.$store.getters.getUser.id;
    }
    if (this.user.id != 0) {
      UserApi.findById(this.user.id).then(response=>{
        this.roleName = response.data.data.roleName
      })
    }
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
