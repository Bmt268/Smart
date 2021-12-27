<template>
  <div class="mat_detail">
    <!-- tabnav -->
    <cate-nav :cated="bookDetail"></cate-nav>
    <!-- content -->
    <div class="mat_content">
      <!-- left -->
      <div class="left_wrap">
        <!-- left--top -->
        <div class="mat_img" :class="{ hidden: !hidden }">
          <iframe
            :src="bookDetail.url"
            frameborder="0"
            v-if="type == 2"
          ></iframe>
          <img :src="bookDetail.coverImageUrl" alt="" v-if="type == 1" />
        </div>
        <!-- 图标 -->
        <icon-tools
          class="tools"
          :cicon="bookDetail"
          :bookCollect="bookCollect"
          @handleAdd="handleAdd"
        ></icon-tools>
        <!-- left--轮播图 -->
        <rotation @handleRota="handleRota" @handletop="handletop"></rotation>
      </div>
      <!-- right -->
      <div class="right_wrap">
        <VerticalTab :tabbase="bookDetail"></VerticalTab>
      </div>
    </div>
  </div>
</template>

<script>
import CateNav from "@/components/CateNav";
import IconTools from "@/components/IconTools";
import Rotation from "@/components/Rotation";
import VerticalTab from "@/components/VerticalTab";

import { getPicBooksDetail, getMaterialDetail } from "@/api/home";

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
    };
  },
  components: {
    CateNav,
    IconTools,
    Rotation,
    VerticalTab,
  },
  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.specialId = this.$route.query.specialId;
    this.initdata();
  },
  methods: {
    // 初始化数据
    initdata() {
      this.type == 2 && this.getPicBooksDetailFun();
      this.type == 1 && this.getMaterialDetailFun();
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
    // 图片接口
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
    // 点击收藏
    handleAdd() {
      this.initdata();
    },
    // 点击轮播图
    handleRota(item) {
      this.id = item.contentId;
      this.initdata();
    },
    // 点击箭头收缩
    handletop(hidden) {
      this.hidden = hidden;
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
      width: 592px;
      height: 740px;
      background: #ffffff;
      box-shadow: 0px 4px 12px 0px rgba(28, 25, 24, 0.04);
      border-radius: 4px 0px 0px 4px;
      margin-left: 32px;
    }
  }
}
</style>