<template>
  <div class="sch">
    <!-- 面包屑 -->
    <div class="bread">
      <span @click="handleback">园所资源</span>
      <div class="bread_item" v-for="(item, index) in breadlist" :key="item.id">
        <span class="el-icon-arrow-right"></span>
        <span @click="handleBread(item, index)">{{ item.title }}</span>
      </div>
    </div>
    <!-- 顶部 -->
    <div class="top">
      <div class="uploading">
        <div
          class="source"
          v-for="(item, index) in soureList"
          :key="index"
          :class="{ active: isactive == index }"
          @click="handleClick(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="theme_right">
        <div class="build_theme" @click="handleBuild">新建主题</div>
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="httpRequest"
          multiple
          :limit="5"
          :file-list="courselist"
          :show-file-list="false"
        >
          <div class="theme_upload">资源上传</div>
        </el-upload>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div
        class="content_item"
        v-for="item in accessories"
        :key="item.id"
        @click="handleDetail(item)"
      >
        <img :src="item.type == 0 ? publicimg : classimg" alt="" />
        <div class="item_titles">{{ item.title }}</div>
      </div>
      <!-- 嵌套内容 -->
      <div
        class="content_item new_content"
        v-for="item in wareList"
        :key="item.id"
      >
        <img :src="handleImg(item)" alt="" />
        <div class="item_titles">{{ item.title }}</div>
        <div class="item_bottom">
          <div class="item_arrange">排课</div>
          <div class="item_add">添加目标</div>
          <div class="item_more" @click="handleMore(item)">更多</div>
        </div>
        <!-- 更多弹窗 -->
        <div class="more_detail" v-if="item.select">
          <div class="ercode">课程二维码</div>
          <div class="rename">重命名</div>
          <div class="delete" @click="handleDelete(item)">删除</div>
          <div class="copy" @click="handleCopy(item)">复制到</div>
        </div>
      </div>
      <el-empty
        :image-size="200"
        v-if="accessories.length == 0 && wareList.length == 0"
      ></el-empty>
      <modify-process
        @clickClose="clickClose"
        v-if="show"
        :parentId="parentId"
        @update="update"
      ></modify-process>
      <copytree @clickClose="clickClose" v-if="hidden" :citem="item"></copytree>
      <upload
        v-show="course"
        :courselist="courselist"
        @clickClose="clickClose"
        :parentId="parentId"
        @autoClose="autoClose"
        @uploadList="uploadList"
      ></upload>
      <div class="upload_progress" v-show="uploadlist">
        <div class="upload_first">
          <div class="uploading">正在上传 {{ courselist.length }} 项</div>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="upload_second">
          <div class="upload_item" v-for="item in courselist" :key="item.uid">
            <div class="upitem_title">{{ item.filename }}</div>
            <i class="el-icon-success" v-if="item.status == 'success'"></i>
            <i class="el-icon-loading" v-if="item.status == 'loading'"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCateGoryChildren,
  getCateGoryCourseware,
  deleteCourseware,
} from "@/api/home.js";
import ModifyProcess from "../../AIClass/components/ModifyProcess.vue";
import Copytree from "../../../components/Copytree.vue";
import Upload from "./Upload.vue";
import { mapGetters } from "vuex";
export default {
  components: { ModifyProcess, Copytree, Upload },
  data() {
    return {
      isactive: 0,
      soureList: ["上传资源"],
      accessories: [],
      publicimg: require("@/assets/image/publicFolder.png"),
      classimg: require("@/assets/image/classSource.png"),
      parentId: "",
      wareList: [],
      downloadimg: require("@/assets/image/download.png"),
      videoimg: require("@/assets/image/video.png"),
      musicimg: require("@/assets/image/music.png"),
      breadlist: [],
      show: false,
      hidden: false,
      item: "",
      course: false,
      uploadlist: false,
    };
  },
  computed: {
    ...mapGetters(["courselist"]),
  },
  mounted() {
    this.parentId = this.$route.query.id;
    this.breadlist.push({
      title: this.$route.query.title,
      id: this.$route.query.id,
    });
    this.getCateGoryChildrenFun();
  },
  methods: {
    handleback() {
      this.$router.back();
    },
    handleClick(index) {
      this.isactive = index;
    },
    handleBuild() {
      this.show = true;
    },
    clickClose() {
      this.show = false;
      this.hidden = false;
      this.course = false;
      this.$store.commit("clearList");
    },
    // 上传完毕后
    autoClose() {
      this.course = false;
      this.getCateGoryCoursewareFun();
      // this.uploadlist = false;
    },
    getCateGoryChildrenFun() {
      getCateGoryChildren({ parentId: this.parentId }).then((res) => {
        this.accessories = res.data;
      });
    },
    handleDetail(item) {
      this.parentId = item.id;
      this.breadlist.push({
        title: item.title,
        id: item.id,
      });
      this.getCateGoryChildrenFun();
      this.getCateGoryCoursewareFun();
    },
    // 里面内容列表
    getCateGoryCoursewareFun() {
      getCateGoryCourseware({ categoryId: this.parentId }).then((res) => {
        this.wareList = res.data;
      });
    },
    handleImg(res) {
      switch (res.type) {
        case 0:
          return this.videoimg;
        case 1:
          return this.musicimg;
        case 2:
          return this.downloadimg;
        case 4:
          return res.coverImageUrl;
      }
    },
    handleBread(item, index) {
      this.parentId = item.id;
      this.getCateGoryChildrenFun();
      this.getCateGoryCoursewareFun();
      this.breadlist.splice(index + 1);
    },
    update() {
      this.getCateGoryChildrenFun();
      this.getCateGoryCoursewareFun();
    },
    // 点击更多
    handleMore(item) {
      console.log(item);
      this.$set(item, "select", true);
    },
    handleCopy(item) {
      this.hidden = true;
      item.select = false;
      this.item = item;
    },
    deleteCoursewareFun(deid) {
      deleteCourseware(deid).then(() => {
        this.getCateGoryCoursewareFun();
      });
    },
    handleDelete(item) {
      this.deleteCoursewareFun(item.id);
    },
    httpRequest(res) {
      this.$store.commit("clearList");
      let list = [];
      list.push(res.file);
      list.forEach((item) => {
        item.intro = "";
        item.label = "";
        item.filename = item.name;
        item.status = "loading";
      });
      this.$store.commit("changelist", list);
      this.course = true;
    },
    uploadList() {
      this.uploadlist = true;
    },
  },
};
</script>

<style lang="less" scoped>
.sch {
  .bread {
    height: 60px;
    display: flex;
    font-size: 14px;
    color: #6e6d7a;
    align-items: center;
    padding-left: 37px;
    span {
      cursor: pointer;
    }
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .uploading {
      display: flex;
      align-items: center;
      height: 89px;
      padding: 32px;
      .source {
        font-size: 18px;
        color: #6e6d7a;
        font-weight: bold;
        cursor: pointer;
        margin-right: 60px;
      }
      .active {
        color: #e5423e;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: -33px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #e5423e;
          border-radius: 10px;
        }
      }
    }
    .theme_right {
      display: flex;
      .build_theme {
        width: 120px;
        height: 44px;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        border: 1px solid #bfbfbf;
        color: #6e6d7a;
        font-size: 18px;
        text-align: center;
        line-height: 44px;
        margin-right: 40px;
        cursor: pointer;
      }
      .theme_upload {
        width: 120px;
        height: 44px;
        background: #e5423e;
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
        border-radius: 4px;
        color: #ffffff;
        font-size: 18px;
        text-align: center;
        line-height: 44px;
        margin-right: 34px;
        cursor: pointer;
      }
    }
  }
  .content {
    background-color: #f5f5fb;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-left: 32px;
    height: calc(100vh - 89px - 66px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 14px;
    }
    &::-webkit-scrollbar-thumb {
      background: #d8d8d8;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
    .content_item {
      width: 414px;
      height: 320px;
      background: #ffffff;
      border-radius: 4px;
      text-align: center;
      margin-right: 24px;
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: 0.3s;
      position: relative;
      .item_titles {
        width: 380px;
        font-size: 18px;
        color: #0d0b22;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-top: 89px;
        margin-bottom: 53px;
      }
      &:hover {
        box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.1);
        transform: translateY(-6px);
      }
      .item_bottom {
        height: 63px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #bfbfbf;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #6e6d7a;
        .item_add {
          border-right: 1px solid #bfbfbf;
          border-left: 1px solid #bfbfbf;
          padding: 0 30px;
        }
        .item_more {
          cursor: pointer;
        }
      }
    }
    .new_content {
      position: relative;
      img {
        margin-bottom: 27px;
      }
      .more_detail {
        width: 140px;
        height: 156px;
        background: #fff;
        box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.1);
        position: absolute;
        right: 0;
        bottom: 64px;
        color: #0d0b22;
        font-size: 14px;
        padding-top: 10px;
        div {
          margin: 10px auto;
          cursor: pointer;
        }
      }
    }
    .el-empty {
      margin: 0 auto;
    }
    .upload_progress {
      width: 500px;
      height: 289px;
      background: #ffffff;
      box-shadow: -5px 0px 12px 0px rgba(28, 25, 24, 0.1),
        5px 0px 12px 0px rgba(28, 25, 24, 0.1);
      border-radius: 8px 8px 0px 0px;
      position: fixed;
      bottom: 0;
      right: 0;
      .upload_first {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        width: 500px;
        height: 80px;
        background: #6e6d7a;
        border-radius: 8px 8px 0px 0px;
        color: #fff;
        font-size: 20px;
        letter-spacing: 1px;
        .el-icon-arrow-down {
          cursor: pointer;
        }
      }
      .upload_second {
        .upload_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          width: 500px;
          height: 70px;
          background: #f6f6f6;
          letter-spacing: 1px;
          color: #6e6d7a;
          font-size: 18px;
          .el-icon-success {
            color: #07c160;
          }
        }
      }
    }
  }
}
</style>