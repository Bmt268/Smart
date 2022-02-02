<template>
  <div class="teacher">
    <div class="class_top">
      <div class="teacher_manage">
        <div class="title">2021秋季</div>
        <div class="tea_number">教师人数: {{ teacherlist.length }}/100</div>
      </div>
      <div class="build" @click="handleAdd">
        <div class="el-icon-plus"></div>
        邀请老师
      </div>
    </div>
    <div class="class_content">
      <el-table
        :data="teacherlist"
        style="width: 100%"
        :header-cell-style="headstyle"
        row-class-name="class_options"
      >
        <el-table-column type="index" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="职务">
          <template slot-scope="scope">
            <div>{{ scope.row.role == 1 ? "园长" : "老师" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="所属班级">
          <template slot-scope="scope">
            <div class="roomlist">
              {{ scope.row.room_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="eid" label="手机号"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="handleclick(scope)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="handleEdit(scope)"
                  >编辑</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="edittitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div class="edit_title">
        <span>*姓名:</span>
        <input type="text" v-model="name_title" />
      </div>
      <div class="edit_title">
        <span>*手机:</span>
        <input type="text" v-model="num_title" />
      </div>
      <div class="edit_content">
        <div class="etitle">*职务:</div>
        <div class="edit_options">
          <el-radio-group v-model="radio">
            <el-radio :label="1">园长</el-radio>
            <el-radio :label="3">老师</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="edit_content">
        <div class="etitle">*班级:</div>
        <div class="edit_options classlist">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              :label="item.room_id"
              v-for="(item, index) in tableData"
              :key="index"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSuccess">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTeacherList,
  getClassList,
  editTeacher,
  delTeacher,
} from "@/api/home.js";
export default {
  data() {
    return {
      tableData: [],
      teacherlist: [],
      checkList: [],
      headstyle: {
        background: "#F7F7F9",
        height: "74px",
        fontSize: "14px",
        color: "#0D0B22",
        textAlign: "center",
      },
      dialogVisible: false,
      radio: 1,
      edittitle: "",
      name_title: "",
      num_title: "",
      roomid: "",
      uid: "",
    };
  },
  mounted() {
    this.getTeacherListFun();
    this.getClassListFun();
  },
  methods: {
    getClassListFun() {
      getClassList().then((res) => {
        this.tableData = res.data.result;
      });
    },

    getTeacherListFun() {
      getTeacherList().then((res) => {
        this.teacherlist = res.data;
      });
    },
    // 点击删除
    handleclick(scope) {
      delTeacher({ uid2set: scope.row.uid }).then((res) => {
        if (res.errcode != 0) {
          this.$message("无法删除");
        } else {
          this.$message("删除成功");
          this.getTeacherListFun();
        }
      });
    },
    // 编辑
    handleEdit(scope) {
      this.dialogVisible = true;
      this.edittitle = "修改信息";
      this.roomid = scope.row.room_id;
      this.name_title = scope.row.name;
      this.num_title = scope.row.eid;
      this.radio = parseInt(scope.row.role);
      this.uid = scope.row.uid;
    },
    // 关闭
    handleClose() {
      this.dialogVisible = false;
    },
    // 创建班级
    handleAdd() {
      this.dialogVisible = true;
      this.edittitle = "创建班级";
      this.input_title = "";
    },
    // 弹窗确定按钮
    handleSuccess() {
      if (this.name_title == "" || this.num_title == "") {
        this.$message({
          type: "warning",
          message: "请填写准确的班级信息",
        });
        return;
      }
      let params = {
        eid: this.num_title,
        name: this.name_title,
        role: this.radio,
        rooms: this.checkList,
        uid2set: this.uid,
      };
      editTeacher(params).then((res) => {
        if (res.errcode == 0) {
          this.dialogVisible = false;
          this.getTeacherListFun();
        }
      });
    },
  },
};
</script>

<style lang="less">
.teacher {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
  border-radius: 4px;
  padding: 0 24px;
  .class_top {
    display: flex;
    padding: 36px 0;
    justify-content: space-between;
    .teacher_manage {
      display: flex;
      align-items: center;
      .title {
        font-size: 24px;
        letter-spacing: 1px;
        color: #0d0b22;
        font-weight: bold;
      }
      .tea_number {
        font-size: 18px;
        color: #6e6d7a;
        margin-left: 20px;
      }
    }

    .build {
      width: 140px;
      height: 44px;
      background: #e5423e;
      box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
      border-radius: 4px;
      text-align: center;
      line-height: 44px;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .class_content {
    .class_options td {
      height: 74px;
      background: #fff;
      text-align: center;
      line-height: 74px;
      padding: 0 24px;
    }
    .el-icon-more {
      cursor: pointer;
      color: #e5423e;
    }
    .el-dropdown-menu {
      text-align: center;
    }
    .el-button--text {
      color: #797471;
      text-align: center;
    }
    .el-table .cell {
      line-height: 30px !important;
    }
  }
  // 弹窗
  .el-dialog {
    width: 700px;
    height: 556px;
    background: #ffffff;
    border-radius: 4px;
  }
  .el-dialog__header {
    border-bottom: 1px solid #bfbfbf;
    margin: 0 30px;
    padding: 31px 10px 27px 10px;

    .el-dialog__title {
      font-size: 20px;
      color: #0d0b22;
      font-weight: 400;
    }
    .el-dialog__headerbtn {
      position: absolute;
      top: 32px;
      right: 41px;
      font-size: 25px;
      .el-dialog__close {
        color: #0d0b22;
      }
    }
  }
  .el-dialog__body {
    padding-left: 40px;
  }
  .edit_title {
    margin-bottom: 23px;
    span {
      display: inline-block;
      font-size: 18px;
      width: 80px;
    }
    input {
      border: 1px solid #bfbfbf;
      border-radius: 4px;
      height: 40px;
      font-size: 18px;
      padding-left: 16px;
      color: #0d0b22;
    }
  }
  .edit_content {
    display: flex;
    margin-top: 25px;
    align-content: center;
    .etitle {
      font-size: 18px;
      width: 80px;
    }
    .edit_options {
      display: flex;
      font-size: 18px;
      .el-radio__inner {
        width: 20px;
        height: 20px;
      }
      .el-radio {
        margin-bottom: 10px;
      }
      .is-checked {
        .el-checkbox__inner {
          background-color: #e5423e;
          border-color: #e5423e;
        }
        .el-radio__inner {
          background: url(~@/assets/image/bingo.png) no-repeat;
          border: none;

          background-size: cover;
        }
        .el-radio__label,
        .el-checkbox__label {
          color: #6e6d7a;
          font-weight: 700;
        }
        .el-radio__inner::after {
          content: "";
          display: none;
        }
      }
      .el-checkbox__inner {
        width: 20px;
        height: 20px;
        border-radius: 10px;
      }
      .el-checkbox__inner::after {
        content: "";
        position: absolute;
        top: 25%;
        left: 40%;
      }
    }
    .classlist {
      width: 500px;
      height: 100px;
      overflow-y: auto;
    }
  }
  .el-dialog__footer {
    padding: 0px 124px 25px 124px;
    span {
      display: inline-block;
    }
    .el-button--default {
      width: 188px;
      height: 44px;
      box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
      border-radius: 4px;
      border: 1px solid #bfbfbf;
      font-weight: 400;
      color: #0d0b22;
      margin-right: 38px;
    }
    .el-button--primary {
      width: 188px;
      height: 44px;
      background: #e5423e;
      box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
      border-radius: 4px;
      font-weight: 400;
      border: none;
    }
  }
}
</style>