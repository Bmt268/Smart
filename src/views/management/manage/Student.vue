<template>
  <div class="student">
    <div class="student_top">
      <div class="class_left">
        <div class="title">2019春季</div>
        <div class="class_id">班级ID: {{ classid }}</div>
        <div class="class_middle">
          <div class="option_wrap">
            <div
              class="class_option"
              v-for="(item, index) in classList"
              :key="item.name"
              v-show="index < 6"
              @click="handlechange(index, item)"
              :class="{ changeindex: changeindex == index }"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="el-icon-arrow-down" @click="show = !show"></div>
        </div>
      </div>
      <div class="build" @click="handleAdd">
        <div class="el-icon-plus"></div>
        邀请老师
      </div>
    </div>
    <!-- 展开窗口 -->
    <div class="class_package" v-show="show">
      <div class="arrow"></div>

      <div
        class="class_item"
        v-for="(item, index) in classList"
        :key="item.name"
        @click="handlechange(index, item)"
        :class="{ changeindex: changeindex == index }"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 邀请老师 -->
    <div class="join" v-show="ewmcode">
      <div class="outside">
        <div class="join_top">
          <div class="join_title">请老师们扫码入园</div>
          <div class="el-icon-close" @click="ewmcode = false"></div>
        </div>
        <div class="join_content">
          <img :src="codeimg" alt="" />
        </div>
      </div>
    </div>
    <div class="student_content">
      <el-table
        :data="studentList"
        style="width: 100%"
        :header-cell-style="headstyle"
        row-class-name="class_options"
      >
        <el-table-column type="index" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="grade_name" label="班级"> </el-table-column>
        <el-table-column prop="birthday" label="出生日期"> </el-table-column>
        <el-table-column prop="contact1" label="爸爸"> </el-table-column>
        <el-table-column prop="contact1_phone" label="手机号">
        </el-table-column>
        <el-table-column prop="contact2" label="妈妈"> </el-table-column>
        <el-table-column prop="contact2_phone" label="手机号">
        </el-table-column>
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
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getMyClassList,
  getStudent,
  quitStudent,
  getInvitStuQR,
} from "@/api/home.js";
export default {
  data() {
    return {
      headstyle: {
        background: "#F7F7F9",
        height: "74px",
        fontSize: "14px",
        color: "#0D0B22",
        textAlign: "center",
      },
      classList: [],
      show: false,
      studentList: [],
      room: "",
      changeindex: 0,
      classid: "",
      ewmcode: false,
      codeimg: "",
    };
  },
  mounted() {
    this.getMyClassListFun();
  },
  methods: {
    getMyClassListFun() {
      getMyClassList().then((res) => {
        this.classList = res.data;
        this.room = res.data[0].room_id;
        this.classid = res.data[0].class_id;
        this.getStudentFun();
      });
    },
    getStudentFun() {
      getStudent({ room: this.room, keyword: "" }).then((res) => {
        this.studentList = res.data;
      });
    },
    // 二维码
    getInvitStuQRFun() {
      getInvitStuQR({ roomId: this.room }).then((res) => {
        this.codeimg = res.data.url;
      });
    },
    // 点击邀请老师
    handleAdd() {
      this.ewmcode = !this.ewmcode;
      this.getInvitStuQRFun();
    },
    // 点击切换班级
    handlechange(index, item) {
      this.changeindex = index;
      this.room = item.room_id;
      this.classid = item.class_id;
      this.getStudentFun();
      this.show = false;
    },
    // 点击删除
    handleclick(scope) {
      quitStudent({ student_id: scope.row.student_id }).then((res) => {
        if (res.errcode != 0) {
          this.$message("删除失败");
        } else {
          this.$message("删除成功");
          this.getStudentFun();
        }
      });
    },
  },
};
</script>

<style lang="less">
.student {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
  border-radius: 4px;
  padding: 0 24px;
  position: relative;
  .student_top {
    display: flex;
    padding: 36px 0;
    justify-content: space-between;
    .class_left {
      display: flex;
      align-items: center;
      .title {
        font-size: 24px;
        letter-spacing: 1px;
        color: #0d0b22;
        font-weight: bold;
      }
      .class_id {
        margin-left: 20px;
        font-size: 18px;
        color: #6e6d7a;
      }
      .class_middle {
        display: flex;
        margin-left: 54px;
        height: 44px;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        border: 1px solid #edeef4;
        text-align: center;
        line-height: 44px;
        position: relative;
        padding-right: 50px;

        .option_wrap {
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          flex-wrap: wrap;

          .class_option {
            padding: 0 24px;
            position: relative;
            color: #6e6d7a;
            font-size: 18px;
            cursor: pointer;
            &::after {
              content: "";
              width: 1px;
              height: 17px;
              border-right: 1px solid #edeef4;
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
            }
            &:nth-child(6) {
              &::after {
                display: none;
              }
            }
          }
          .changeindex {
            color: #e5423e;
          }
        }
        .el-icon-arrow-down {
          position: absolute;
          top: 50%;
          right: 24px;
          transform: translateY(-50%);
          cursor: pointer;
        }
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
  .class_package {
    width: 1360px;
    background: #ffffff;
    box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
    border: 1px solid #edeef4;
    position: absolute;
    top: 90px;
    right: 72px;
    z-index: 3;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;

    .arrow {
      width: 20px;
      height: 20px;
      background-color: #fff;
      position: absolute;
      top: -3px;
      right: 50px;
      transform: rotate(-45deg);
    }
    .class_item {
      padding: 0 25px;
      border-bottom: 1px solid #bfbfbf;
      line-height: 72px;
      height: 72px;
      color: #6e6d7a;
    }
    .changeindex {
      color: #e5423e;
    }
  }
  .join {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
    .outside {
      width: 700px;
      height: 508px;
      background: #ffffff;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 6;
      .join_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 30px;
        padding: 30px 10px;
        border-bottom: 1px solid #bfbfbf;
        .join_title {
          font-size: 20px;
          font-weight: 400;
          color: #0d0b22;
        }
        .el-icon-close {
          font-size: 30px;
        }
      }
      .join_content {
        text-align: center;
        img {
          width: 340px;
          height: 340px;
          margin-top: 30px;
        }
      }
    }
  }
  .student_content {
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
}
</style>