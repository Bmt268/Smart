<template>
  <div class="material_wrap" @click="handleRead">
    <img v-lazy="citem.coverImageUrl" alt="" />
    <h2>{{ citem.title }}</h2>
    <h3>{{ type[citem.contentType] }}</h3>
    <div class="intr">{{ citem.intro }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: ["活动", "图片", "绘本", "音乐", "", "", "", "", "游戏", "视频"],
    };
  },
  props: {
    citem: {
      type: Object,
    },
    bitem: {
      type: Array,
    },
  },
  methods: {
    handleRead() {
      this.$emit("handleRead", this.citem, this.bitem);
    },
  },
};
</script>

<style lang="less">
.material_wrap {
  width: 414px;
  height: 584px;
  padding: 20px;
  box-shadow: 0px 3px 12px 0px rgba(28, 25, 24, 0.1);
  border-radius: 4px;
  background-color: #fff;
  margin-right: 20px;
  margin-bottom: 20px;

  img {
    width: 374px;
    height: 390px;
    object-fit: cover;
  }
  h2 {
    margin-top: 30px;
    margin-left: 10px;
    color: #0d0b22;
    font-size: 18px;
  }
  h3 {
    margin-top: 12px;
    margin-left: 10px;
    color: #6e6d7a;
    font-size: 16px;
  }
  .intr {
    margin-top: 24px;
    margin-left: 10px;
    color: #6e6d7a;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>