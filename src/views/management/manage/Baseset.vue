<template>
  <div class="base_set">
    <!-- 上 -->
    <div class="base_top">
      <div class="top_item">
        <div class="top_left">
          <div class="left_title">学生人数</div>
          <div class="left_num">{{ basenum.student }}</div>
        </div>
        <div class="top_right">
          <img src="@/assets/image/manage/student.png" alt="" />
        </div>
      </div>
      <div class="top_item">
        <div class="top_left">
          <div class="left_title">教师人数</div>
          <div class="left_num">{{ basenum.teacher_count }}</div>
        </div>
        <div class="top_right">
          <img src="@/assets/image/manage/teacher.png" alt="" />
        </div>
      </div>
      <div class="top_item">
        <div class="top_left">
          <div class="left_title">班级数量</div>
          <div class="left_num">{{ basenum.room_count }}</div>
        </div>
        <div class="top_right">
          <img src="@/assets/image/manage/class.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="base_content">
      <!-- logo -->
      <div class="base_logo">
        <div class="logo_title">园所logo</div>
        <div class="logo_describe">
          请添加园所彩色LOGO图片，图片请小于100KB~
        </div>
        <el-upload action="" multiple :on-change="handleAvatarSuccess">
          <div class="img_add" v-if="!selfinfo.round_logo_url">
            <div class="el-icon-plus"></div>
          </div>
          <img
            :src="selfinfo.round_logo_url"
            alt=""
            v-else
            class="round_logo"
          />
        </el-upload>
        <div class="img_round">圆形LOGO</div>
      </div>

      <!-- 轮播 -->
      <div class="base_rotation">
        <div class="rota_title">园所轮播图</div>
        <div class="rota_des">请添加园所标语和轮播图，图片大于800KB为佳</div>
        <input
          type="text"
          name=""
          id=""
          placeholder="请输入园所名称"
          class="rota_name"
          v-model="selfinfo.name"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="请输入园所标语"
          class="rota_name"
          v-model="selfinfo.brand"
        />
        <div class="rota_content">
          <!-- <div class="content_left">
            <div class="content_add">
              <div class="el-icon-plus"></div>
            </div>
            <div class="rotation_name">轮播图1</div>
          </div>
          <div class="content_right">
            <div class="rota_preview">
              <div class="icon_left">
                <div class="rota_view">
                  <div class="el-icon-view"></div>
                </div>
                <div class="icon_name">预览</div>
              </div>
              <div class="icon_right">
                <div class="rota_delete">
                  <div class="el-icon-delete"></div>
                </div>
                <div class="icon_name">删除</div>
              </div>
            </div>
            <div class="rotation_name">轮播图2</div>
          </div> -->
          <el-upload
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="filelist"
            :on-change="handleBannerSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </div>
      </div>

      <!-- 广告 -->
      <div class="base_adv">
        <div class="adv_title">园所广告</div>
        <div class="adv_radio">
          <div class="radio_title">1、上传视频</div>
          <div class="radio_add">
            <div class="el-icon-plus"></div>
          </div>
        </div>
        <div class="adv_radio">
          <div class="radio_title">2、上传图片</div>
          <div class="radio_add">
            <div class="el-icon-plus"></div>
          </div>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="base_save" @click="handleSave">保存</div>
    </div>
  </div>
</template>

<script>
import { getSaasCount, getSelf, setCfg } from "@/api/home.js";
export default {
  data() {
    return {
      basenum: "",
      selfinfo: "",
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  mounted() {
    this.getSaasCountFun();
    this.getSelfFun();
  },
  computed: {
    filelist() {
      if (!this.selfinfo.banner_url) return;
      return this.selfinfo.banner_url.map((item, index) => {
        return {
          name: index,
          url: item.url,
          md5: item.md5,
        };
      });
    },
  },
  methods: {
    getSaasCountFun() {
      getSaasCount().then((res) => {
        this.basenum = res.data;
      });
    },
    // 图片
    getSelfFun() {
      getSelf().then((res) => {
        console.log(res);
        this.selfinfo = res.data;
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //  提交
    handleSave() {
      let params = {
        ad_image: this.selfinfo.ad_image_url,
        ad_video: this.selfinfo.ad_video_url,
        banner: [],
        brand: this.selfinfo.brand,
        logo: this.selfinfo.logo,
        name: this.selfinfo.name,
        round_logo: this.selfinfo.round_logo_url,
        teaching_idea: "",
      };
      setCfg(params).then((res) => {
        console.log(res);
        this.$bus.$emit("saveLogo");
      });
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.getBase64(res.raw).then((res) => {
        // console.log(res);
        this.selfinfo.round_logo_url = res;
      });
    },
    handleBannerSuccess(file, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);

      this.selfinfo.banner_url.push(file);
      console.log(fileList);
    },
  },
};
</script>

<style lang="less">
.base_set {
  .base_top {
    display: flex;
    justify-content: space-between;
    .top_item {
      width: 540px;
      height: 172px;
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      padding: 33px 70px;
      align-items: center;
      .top_left {
        text-align: center;
        .left_title {
          font-weight: 400;
          color: #6e6d7a;
          font-size: 24px;
        }
        .left_num {
          color: #0d0b22;
          font-size: 56px;
          margin-top: 13px;
        }
      }
      .top_right {
        width: 100px;
        height: 100px;
        background: #f7f7f9;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          // width: 48px;
          // height: 36px;
          width: 50%;
          height: 50%;
        }
      }
    }
  }
  .base_content {
    background: #ffffff;
    margin-top: 32px;
    padding: 30px 0 48px 36px;

    .base_logo {
      .logo_title {
        font-size: 24px;
        font-weight: bold;
        color: #0d0b22;
      }
      .logo_describe {
        color: #6e6d7a;
        font-size: 18px;
        margin-top: 22px;
      }
      .img_add {
        width: 100px;
        height: 100px;
        margin-top: 36px;

        background: #f7f7f9;
        border-radius: 50px;
        border: 1px dashed #6e6d7a;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-icon-plus {
          font-size: 40px;
          color: #595e7c;
        }
      }
      .round_logo {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        margin-top: 36px;
      }
      .img_round {
        margin-top: 20px;
        color: #6e6d7a;
        font-size: 18px;
        margin-left: 7px;
      }
    }
    .base_rotation {
      margin-top: 80px;
      .rota_title {
        font-weight: bold;
        color: #0d0b22;
        font-size: 24px;
      }
      .rota_des {
        margin-top: 22px;
        color: #6e6d7a;
        font-size: 18px;
      }
      .rota_name {
        display: block;
        border-bottom: 1px solid #bfbfbf;
        margin-top: 36px;
        padding-bottom: 10px;
        width: 400px;
      }
      ::placeholder {
        font-size: 18px;
        color: #6e6d7a;
      }
      .rota_content {
        margin-top: 35px;
        display: flex;
        .content_left {
          .content_add {
            width: 438px;
            height: 122px;
            background: #f7f7f9;
            border: 1px dashed #6e6d7a;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-icon-plus {
              font-size: 40px;
            }
          }
          .rotation_name {
            margin-top: 20px;
            font-size: 18px;
            color: #6e6d7a;
          }
        }
        .content_right {
          margin-left: 100px;
          .rota_preview {
            width: 438px;
            height: 122px;
            background: #333333;
            opacity: 0.6;
            display: flex;
            padding: 23px 0 0 152px;
            .icon_left {
              text-align: center;
              .rota_view {
                width: 48px;
                height: 48px;
                background: #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .icon_name {
                color: #ffffff;
                font-size: 18px;
                margin-top: 10px;
              }
            }
            .icon_right {
              margin-left: 48px;
              text-align: center;

              .rota_delete {
                width: 48px;
                height: 48px;
                background: #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .icon_name {
                color: #ffffff;
                font-size: 18px;
                margin-top: 10px;
              }
            }
          }
          .rotation_name {
            margin-top: 20px;
            font-size: 18px;
            color: #6e6d7a;
          }
        }
      }
    }
    .base_adv {
      margin-top: 80px;
      .adv_title {
        font-weight: bold;
        color: #0d0b22;
        font-size: 24px;
      }
      .adv_radio {
        margin-top: 36px;
        .radio_title {
          color: #6e6d7a;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .radio_add {
          width: 448px;
          height: 252px;
          background: #f7f7f9;
          border: 1px dashed #6e6d7a;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-icon-plus {
            font-size: 40px;
          }
        }
      }
    }
    .base_save {
      margin-top: 80px;
      width: 140px;
      height: 44px;
      background: #e5423e;
      box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
      border-radius: 4px;
      color: #ffffff;
      font-size: 18px;
      text-align: center;
      line-height: 44px;
    }
    .el-upload-list--picture-card .el-upload-list__item-thumbnail {
      object-fit: contain;
    }
  }
}
</style>