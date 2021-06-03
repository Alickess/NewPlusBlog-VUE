<template>
  <section class="main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 角色管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div>
        <el-button type="primary" @click="roleSaveHandle">新增角色</el-button>
      </div>
      <el-tabs :tab-position="tabPosition" @tab-click="getPermission">
        <el-tab-pane
          :data="roleData"
          v-for="role in roleData"
          :key="role.id"
          :label="role.roleName"
        >
          <div class="drag-box">
            <div class="drag-box-item">
              <div class="item-title">拥有的权限</div>
              <draggable
                v-model="role.permissionList"
                @remove="removeHandle"
                v-bind="dragOptions"
              >
                <div v-if="role.permissionList != null">
                  <transition-group
                    tag="div"
                    id="havePermission"
                    class="item-ul"
                  >
                    <div
                      v-for="item in role.permissionList"
                      class="drag-list"
                      :key="item.id"
                    >
                      {{ item.description }}
                    </div>
                  </transition-group>
                </div>
              </draggable>
            </div>
            <div class="drag-box-item">
              <div class="item-title">未拥有的权限</div>
              <draggable
                v-model="haveNotPermission"
                @remove="removeHandle"
                v-bind="dragOptions"
              >
                <transition-group
                  tag="div"
                  id="haveNotPermission"
                  class="item-ul"
                >
                  <div
                    v-for="item in haveNotPermission"
                    class="drag-list"
                    :key="item.id"
                  >
                    {{ item.description }}
                  </div>
                </transition-group>
              </draggable>
            </div>
            <div>
              <el-form
                ref="ruleForm"
                :model="roleForm"
                label-width="70px"
                :rules="roleRules"
                class="demo-ruleForm"
              >
                <el-form-item label="角色名" prop="roleName">
                  <el-input v-model="roleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                  <el-input v-model="roleForm.description"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateRoleAndPermission(role)"
                  >更新角色和权限</el-button
                >
              </span>
            </div>
          </div></el-tab-pane
        >
      </el-tabs>
    </div>


    <!-- 新增角色信息弹出框 -->
    <el-dialog title="更改角色信息" :visible.sync="roleSaveVisible" width="30%">
      <el-form
        ref="ruleForm"
        :model="roleForm"
        label-width="70px"
        :rules="roleRules"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleSaveVisible = false">取 消</el-button>
        <el-button type="primary" @click="save('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import RoleApi from "../api/role";
import PermissionApi from "../api/permission";
export default {
  name: "roleManger",
  components: {
    draggable,
  },
  data() {
    return {
      tabPosition: "top",
      dragOptions: {
        animation: 120,
        scroll: true,
        group: "sortlist",
        ghostClass: "ghost-style",
      },
      roleSaveVisible: false,
      roleData: [],
      roleForm: {
        id: "",
        roleName: "",
        description: "",
        permissionList: [],
      },
      roleRules: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
      },
      haveNotPermission: [],
      //所有的权限
      permissionData: [],
    };
  },

  methods: {
    list() {
      RoleApi.findAll().then((response) => {
        this.roleData = response.data.data.records;
        const tab = { index: 0 };
        this.getPermission(tab);
      });
    },
    //新增前的操作
    roleSaveHandle() {
      this.roleForm = {};
      this.roleSaveVisible = true;
    },
    //新增操作
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          RoleApi.singleSave(this.roleForm).then((response) => {
            this.$message.success("新增成功");
            this.roleSaveVisible = false;
            this.$router.go(0);
          });
        } else {
          this.$message.error("输入的信息不正确");
          return false;
        }
      });
    },
    getPermission(tab) {
      this.roleForm.id = this.roleData[tab.index].id;
      this.roleForm.roleName = this.roleData[tab.index].roleName;
      this.roleForm.description = this.roleData[tab.index].description;
      this.haveNotPermission = [];
      this.permissionData = [];

      //得到所有的权限
      PermissionApi.list().then((response) => {
        this.permissionData = response.data.data.records;
        //进行比较
        const length1 = this.permissionData.length;
        const length2 = this.roleData[tab.index].permissionList.length;
        for (let i = 0; i < length1; i++) {
          for (let j = 0; j < length2; j++) {
            if (
              JSON.stringify(this.permissionData[i]) ===
              JSON.stringify(this.roleData[tab.index].permissionList[j])
            ) {
              this.permissionData.splice(i, 1);
            }
          }
        }
        this.haveNotPermission = this.permissionData;
      });
    },

    removeHandle(event) {
      this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
      console.log(this.roleForm.permissionList)
    },

    // 更新角色权限
    updateRoleAndPermission(role) {
      this.roleForm.permissionList=role.permissionList
      console.log(this.roleForm.permissionList)
      RoleApi.singleUpdate(this.roleForm)
        .then((response) => {
          this.$message.success("更新成功");
          this.list();
          //this.$router.go(0);
        })
        .catch((response) => {
          this.$message.error(`修改失败`);
          this.list();
          //this.$router.go(0);
        });
    },
  },
  created() {
    this.list();
  },
};
</script>

<style scoped>
.drag-box {
  display: flex;
  user-select: none;
}
.drag-box-item {
  flex: 1;
  max-width: 330px;
  min-width: 300px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
}
.item-ul {
  padding: 0 8px 8px;
  height: 500px;
  overflow-y: scroll;
}
.item-ul::-webkit-scrollbar {
  width: 0;
}
.drag-list {
  border: 1px #e1e4e8 solid;
  padding: 10px;
  margin: 5px 0 10px;
  list-style: none;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  -webkit-transition: border 0.3s ease-in;
  transition: border 0.3s ease-in;
}
.drag-list:hover {
  border: 1px solid #20a0ff;
}
.drag-title {
  font-weight: 400;
  line-height: 25px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.ghost-style {
  display: block;
  color: transparent;
  border-style: dashed;
}
</style>
