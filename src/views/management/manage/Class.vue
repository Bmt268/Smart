<template>
  <div class="class">
    <div class="class_top">
      <div class="title">2019春季</div>
      <div class="build" @click="handleAdd">
        <div class="el-icon-plus"></div>
        创建班级
      </div>
    </div>
    <div class="class_content">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="headstyle"
        row-class-name="class_options"
      >
        <el-table-column type="index" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="grade_name" label="年级"></el-table-column>
        <el-table-column prop="name" label="班级"> </el-table-column>
        <el-table-column prop="class_id" label="班级ID"> </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            <span>{{ scope.row.addts | datefmt("YYYY-MM-DD") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teacher_num" label="教师人数"> </el-table-column>
        <el-table-column prop="student_num" label="学生人数"> </el-table-column>
        <el-table-column prop="rate" label="男女比例"> </el-table-column>
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
                <!-- <el-button type="text" @click="dialogVisible = true"
                  >编辑</el-button
                > -->
                <!-- <el-dropdown-item @click.native.prevent="handleclick(scope)"
                  >编辑</el-dropdown-item
                > -->
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
      width="30%"
      :before-close="handleClose"
    >
      <div class="edit_title">
        <span>名称:</span>
        <input type="text" v-model="input_title" />
      </div>
      <div class="edit_content">
        <div class="etitle">年级:</div>
        <div class="edit_options">
          <el-radio-group v-model="radio">
            <el-radio :label="1">托班</el-radio>
            <el-radio :label="2">小班</el-radio>
            <el-radio :label="3">中班</el-radio>
            <el-radio :label="4">大班</el-radio>
            <el-radio :label="5">大大班</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancel"
          >取 消</el-button
        >
        <el-button type="primary" @click="handleSuccess" class="sure"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getClassList, delClass, editClass, addClass } from "@/api/home.js";
export default {
  data() {
    return {
      tableData: [],
      headstyle: {
        background: "#F7F7F9",
        height: "74px",
        fontSize: "14px",
        color: "#0D0B22",
        textAlign: "center",
      },
      dialogVisible: false,
      radio: "",
      edittitle: "",
      input_title: "",
      roomid: "",
    };
  },
  mounted() {
    this.getClassListFun();
  },
  methods: {
    getClassListFun() {
      getClassList().then((res) => {
        this.tableData = res.data.result;
      });
    },
    // 点击删除
    handleclick(scope) {
      delClass({ room_id: scope.row.room_id }).then((res) => {
        if (res.errcode != 0) {
          this.$message("班级存在学生，无法删除");
        } else {
          this.$message("删除成功");
          this.getClassListFun();
        }
      });
    },
    // 编辑
    handleEdit(scope) {
      this.dialogVisible = true;
      this.edittitle = "编辑班级";
      this.roomid = scope.row.room_id;
      this.input_title = scope.row.name;
      this.radio = parseInt(scope.row.grade);
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
      if (this.input_title == "" || this.radio == "") {
        this.$message({
          type: "warning",
          message: "请填写准确的班级信息",
        });
        return;
      }
      if (this.edittitle == "创建班级") {
        let params = {
          grade: this.radio,
          name: this.input_title,
        };
        addClass(params).then((res) => {
          if (res.code == 200) {
            this.dialogVisible = false;
            this.getClassListFun();
          }
        });
      } else {
        let params = {
          grade: this.radio,
          name: this.input_title,
          roomId: this.roomid,
        };
        editClass(params).then((res) => {
          if (res.code == 200) {
            this.dialogVisible = false;
            this.getClassListFun();
          }
        });
      }
    },
  },
};
</script>

<style lang="less">
.class {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
  border-radius: 4px;
  padding: 0 24px;
  .class_top {
    display: flex;
    padding: 36px 0;
    justify-content: space-between;
    .title {
      font-size: 24px;
      letter-spacing: 1px;
      color: #0d0b22;
      font-weight: bold;
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
  }
  // 弹窗
  .el-dialog__title {
    font-size: 20px;
    color: rgba(89, 95, 124);
    font-weight: 600;
  }
  .edit_title {
    span {
      display: inline-block;
      font-size: 18px;
      width: 100px;
    }
    input {
      background-color: #f5f5fb;
      border-radius: 20px;
      height: 40px;
      font-size: 18px;
      padding-left: 10px;
    }
  }
  .edit_content {
    display: flex;
    margin-top: 25px;
    align-content: center;
    .etitle {
      font-size: 18px;
      width: 100px;
    }
    .edit_options {
      // margin-left: 40px;
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
        .el-radio__inner {
          background: url(~@/assets/image/bingo.png) no-repeat;
          border: none;

          background-size: cover;
        }
        .el-radio__label {
          color: #6e6d7a;
          font-weight: 700;
        }
        .el-radio__inner::after {
          content: "";
          display: none;
        }
      }
    }
  }
  .dialog-footer {
    .cancel {
      border-radius: 20px;
      color: #6e6d7a;
      background: #f7f7f9;
      border: none;
      font-weight: 800;
    }
    .sure {
      border-radius: 20px;
      background-color: #e5423e;
      color: #fff;
      border: none;
      font-weight: 800;
    }
  }
}
</style>