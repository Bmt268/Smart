<template>
  <div class="class">
    <div class="class_top">
      <div class="title">2019春季</div>
      <div class="build">
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
            <span>{{ scope.row.addts | datefmt() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teacher_num" label="教师人数"> </el-table-column>
        <el-table-column prop="student_num" label="学生人数"> </el-table-column>
        <el-table-column prop="rate" label="男女比例"> </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  icon="el-icon-plus"
                  @click.native.prevent="handleclick(scope)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <div class="class_options">
      <div class="option_name">编号</div>
      <div class="option_name">年级</div>
      <div class="option_name">班级</div>
      <div class="option_name">编号</div>
    </div>
    <div class="class_content">
      <div class="class_result">
        <div class="result">1</div>
        <div class="result">小</div>
        <div class="result">小一班</div>
        <div class="result">1</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getClassList, delClass } from "@/api/home.js";
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
    };
  },
  filters: {
    datefmt(value) {
      return this.$moment(value).format("YYYY-MM-DD");
    },
  },
  mounted() {
    this.getClassListFun();
  },
  methods: {
    getClassListFun() {
      getClassList().then((res) => {
        console.log(res);
        this.tableData = res.data.result;
      });
    },
    handleclick(scope) {
      console.log(scope);
      delClass({ room_id: scope.row.room_id }).then((res) => {
        console.log(res);
        if (res.errcode != 0) {
          this.$message("班级存在学生，无法删除");
        } else {
          this.$message("删除成功");
          this.getClassListFun();
        }
      });
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
    }
  }
}
</style>