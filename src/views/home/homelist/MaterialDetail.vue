<template>
  <div class="mat_detail">
    <!-- tabnav -->
    <cate-nav :cated="bookDetail" @scheduleclick="scheduleClick"></cate-nav>
    <!-- content -->
    <div class="mat_content">
      <!-- left -->
      <div class="left_wrap">
        <!-- left--top -->
        <div class="mat_img" :class="{ hidden: !hidden }">
          <iframe
            :src="bookDetail.url"
            frameborder="0"
            v-if="type == 2 || type == 0"
          ></iframe>
          <img :src="bookDetail.coverImageUrl" alt="" v-if="type == 1" />
          <audio-detail
            :audio="bookDetail"
            @clickMusic="clickMusic"
            v-if="type == 3"
          ></audio-detail>
        </div>
        <!-- 图标 -->
        <icon-tools
          class="tools"
          :cicon="bookDetail"
          :bookCollect="bookCollect"
          @handleAdd="handleAdd"
        ></icon-tools>
        <!-- left--轮播图 -->
        <rotation
          @handleRota="handleRota"
          @handletop="handletop"
          v-if="type != 3"
        ></rotation>
      </div>
      <!-- right -->
      <div class="right_wrap">
        <VerticalTab :tabbase="bookDetail"></VerticalTab>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="加入 AI 课表"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div class="material_name">
        <div class="material_title">素材名称:</div>
        <div class="material_series">{{ types[type] }}</div>
        <div class="material_detail">{{ bookDetail.title }}</div>
      </div>
      <div class="material_class">
        <div class="classai">班级:</div>
        <div class="mat_classcont">
          <el-select v-model="roomid" placeholder="请选择">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.name"
              :value="item.room_id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="material_date">
        <div class="mat_data">日期：</div>
        <div class="date_cont">
          <el-date-picker
            v-model="date"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="material_link">
        <div class="classai">环节:</div>
        <div class="mat_classcont">
          <el-select v-model="processid" placeholder="请选择">
            <el-option
              v-for="item in processList"
              :key="item.value"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确认提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CateNav from "@/components/CateNav";
import IconTools from "@/components/IconTools";
import Rotation from "@/components/Rotation";
import VerticalTab from "@/components/VerticalTab";
import AudioDetail from "./AudioDetail.vue";

import {
  getPicBooksDetail,
  getMaterialDetail,
  getActivityDetail,
  getVideoDetail,
  getGameDetail,
  getClasses,
  getmaterialcheduling,
  setMaterialsDefaultTarget,
} from "@/api/home";

export default {
  data() {
    return {
      id: "",
      type: "",
      specialId: "",
      bookDetail: {},
      cate: {},
      bookCollect: 0,
      hidden: true,
      dialogVisible: false,
      classOptions: [],
      processList: [],
      processid: "",
      roomid: "",
      date: "",
      types: ["活动", "图片", "绘本", "音乐", "", "", "", "", "游戏", "视频"],
    };
  },
  components: {
    CateNav,
    IconTools,
    Rotation,
    VerticalTab,
    AudioDetail,
  },
  mounted() {
    this.getToday();
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.specialId = this.$route.query.specialId;
    this.initdata();
    this.getClassesFun();
  },
  methods: {
    // 初始化数据
    initdata() {
      this.type == 2 && this.getPicBooksDetailFun();
      this.type == 1 && this.getMaterialDetailFun();
      this.type == 0 && this.getActivityDetailFun();
      this.type == 10 && this.getGameDetailFun();
      this.type == 9 && this.getVideoDetailFun();
      this.type == 3 && this.getMaterialDetailFun();
    },
    // 绘本接口
    async getPicBooksDetailFun() {
      let params = {
        mid: this.id,
        specialId: this.specialId,
      };

      let res = await getPicBooksDetail(params);
      this.bookDetail = res.data.book;
      this.bookCollect = res.data.collect;
    },
    // 图片接口,音乐接口
    getMaterialDetailFun() {
      let params = {
        mid: this.id,
        specialId: this.specialId,
        type: this.type,
      };
      getMaterialDetail(params).then((res) => {
        this.bookDetail = res.data;
        this.bookCollect = res.data.collect;
        console.log(this.bookCollect);
      });
    },
    // 活动接口
    getActivityDetailFun() {
      let params = {
        aid: this.id,
      };
      getActivityDetail(params).then((res) => {
        this.bookDetail = res.data;
        this.bookCollect = res.data.collect;
      });
    },
    // 游戏接口
    getGameDetailFun() {
      let params = {
        mid: this.id,
        specialId: this.specialId,
      };
      getGameDetail(params).then((res) => {
        this.bookDetail = res.data;
        this.bookCollect = res.data.collect;
      });
    },
    // 视频接口
    getVideoDetailFun() {
      let params = {
        mid: this.id,
        specialId: this.specialId,
      };
      getVideoDetail(params).then((res) => {
        this.bookDetail = res.data;
        this.bookCollect = res.data.collect;
      });
    },

    // 点击收藏
    handleAdd() {
      this.initdata();
    },
    // 点击轮播图
    handleRota(item) {
      this.id = item.contentId;
      this.type = item.contentType;
      this.initdata();
    },
    // 点击箭头收缩
    handletop(hidden) {
      this.hidden = hidden;
    },
    // 点击排课
    scheduleClick() {
      this.dialogVisible = true;
    },
    // 关闭排课弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取班级列表
    getClassesFun() {
      getClasses().then((res) => {
        console.log(res);
        this.classOptions = res.data;
        this.roomid = res.data[0].room_id;
        this.getmaterialchedulingFun();
      });
    },
    // 获取环节列表
    getmaterialchedulingFun() {
      let params = {
        roomId: this.roomid,
        date: this.date,
      };
      getmaterialcheduling(params).then((res) => {
        console.log(res);
        this.processList = res.data;
        this.processid = res.data[0].id;
      });
    },
    // 获取当前时间
    getToday() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = now.getDate();
      day = day < 10 ? "0" + day : day;
      this.date = year + "" + month + "" + day;
      console.log(this.date);
    },
    // 确认接口
    setMaterialsDefaultTargetFun() {
      let params = {
        date: this.date,
        guide: "done",
        roomId: this.roomid,
        processStudyId: this.processid,
        materials: [
          {
            contentId: this.id,
            contentType: this.type,
          },
        ],
      };
      setMaterialsDefaultTarget(params).then((res) => {
        console.log(res, "set");
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "排课成功",
          });
        } else {
          this.$message({
            type: "warning",
            message: "排课失败",
          });
        }
      });
    },
    // 点击确认提交
    handleConfirm() {
      this.setMaterialsDefaultTargetFun();
      this.dialogVisible = false;
    },
    clickMusic(item) {
      this.id = item.contentId;
      this.getMaterialDetailFun();
    },
  },
};
</script>

<style lang="less">
.mat_detail {
  height: 100vh;
  .mat_content {
    background: #f5f5fb;
    padding: 32px;
    display: flex;
    .left_wrap {
      width: 1153px;
      height: 492px;
      .mat_img {
        height: 492px;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px 4px 0px 0px;
        background: #fff;
        iframe,
        img {
          width: 100%;
          height: 100%;
          object-fit: scale-down;
        }
      }
      .tools {
        background: #fff;
      }
      .hidden {
        height: 692px;
      }
    }
    .right_wrap {
      width: 562px;
      height: 740px;
      background: #ffffff;
      box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
      border-radius: 4px 0px 0px 4px;
      margin-left: 32px;
    }
  }
  .el-dialog {
    width: 700px;
    background: #ffffff;
    border-radius: 4px;
  }
  .el-dialog__header {
    border-bottom: 1px solid #bfbfbf;
    margin: 0 30px;
    padding: 31px 10px 27px 10px;
  }
  .el-dialog__title {
    color: #0d0b22;
    font-size: 20px;
    letter-spacing: 1px;
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: 31px;
    right: 41px;
    font-size: 25px;
    .el-dialog__close {
      color: #0d0b22;
      font-weight: bold;
    }
  }
  .el-dialog__body {
    padding: 35px 0 0 40px;
    .material_name {
      display: flex;
      align-items: center;

      .material_title {
        width: 100px;
        margin-right: 10px;
        font-size: 18px;
        color: #6e6d7a;
      }
      .material_series {
        width: 62px;
        height: 24px;
        background: #e5423e;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        margin-right: 22px;
      }
      .material_detail {
        color: #0d0b22;
        font-size: 18px;
      }
    }
    .material_class {
      display: flex;
      margin-top: 38px;
      align-items: center;
      .classai {
        width: 100px;
        margin-right: 10px;
        font-size: 18px;
        color: #6e6d7a;
      }
      .mat_classcont {
        .el-select {
          width: 431px;
          height: 44px;
          border-radius: 4px;
          line-height: 44px;
          ::placeholder {
            font-size: 18px;
          }
          .el-input.is-focus .el-input__inner,
          .el-input__inner:focus {
            border-color: #e5423e;
          }
          .el-input__inner {
            border: 1px solid #bfbfbf;
            height: 44px;
          }
        }
      }
    }
    .material_date {
      display: flex;
      margin-top: 38px;
      align-items: center;
      .mat_data {
        width: 100px;
        margin-right: 10px;
        font-size: 18px;
        color: #6e6d7a;
      }
      .date_cont {
        line-height: 44px;
        font-size: 18px;
        color: #0d0b22;
        .el-date-editor.el-input {
          width: 431px;
          box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
          border-radius: 4px;
          ::placeholder {
            font-size: 18px;
          }
        }
        .el-input__inner {
          border: 1px solid #bfbfbf;
          height: 44px;
        }
      }
    }
    .material_link {
      display: flex;
      margin-top: 38px;
      align-items: center;
      .classai {
        width: 100px;
        margin-right: 10px;
        font-size: 18px;
        color: #6e6d7a;
      }
      .mat_classcont {
        .el-select {
          width: 431px;
          height: 44px;
          border-radius: 4px;
          line-height: 44px;
          ::placeholder {
            font-size: 18px;
          }
          .el-input.is-focus .el-input__inner,
          .el-input__inner:focus {
            border-color: #e5423e;
          }
          .el-input__inner {
            border: 1px solid #bfbfbf;
            height: 44px;
          }
        }
      }
    }
  }
  .el-dialog__footer {
    padding-top: 64px;
    text-align: center;
    padding-bottom: 50px;
    // margin-top: 64px;
  }
  .el-button {
    width: 120px;
    height: 44px;
    box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
    border-radius: 4px;
    font-size: 18px;
  }
  .el-button--primary {
    background: #e5423e;
    border-color: #e5423e;
  }
}
.el-select-dropdown__item.selected {
  color: #e5423e;
}
</style>