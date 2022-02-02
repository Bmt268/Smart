<template>
  <div class="mat_run" :class="{ ishidden: !show }">
    <div class="run_top" @click="handleTop">
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="run_left" @click="handleLeft">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="run_right" @click="handleright">
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="rotation">
      <div class="rota" ref="rota">
        <div
          class="rota_item"
          v-for="(item, index) in rotaList"
          :key="index"
          ref="rotaitem"
          @click="handlerota(item, index)"
          :class="{ active: classindex === index }"
        >
          <img :src="item.coverImageUrl" alt="" />
          <span class="rota_title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      timer: null,
      rotaList: [],
      classindex: 0,
      show: true,
    };
  },
  methods: {
    handleTop() {
      this.show = !this.show;
      this.$emit("handletop", this.show);
    },
    handleright() {
      let rotaItem = this.$refs.rotaitem[0];
      let div = getComputedStyle(rotaItem, null);
      let target = rotaItem.clientWidth + parseInt(div.marginRight);
      if (this.count >= this.rotaList.length - 5) {
        return;
      }
      this.count++;
      this.move(this.$refs.rota, -(this.count * target));
      console.log(-this.count * target);
    },
    handleLeft() {
      let rotaItem = this.$refs.rotaitem[0];
      let div = getComputedStyle(rotaItem, null);
      let target = rotaItem.clientWidth + parseInt(div.marginRight);
      if (this.count <= 0) {
        return;
      }
      this.count--;
      this.move(this.$refs.rota, -this.count * target);
    },
    handlerota(item, index) {
      this.$emit("handleRota", item);
      this.classindex = index;
    },
    // 移动动画
    move(element, target) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        var current = element.offsetLeft;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        element.style.left = current + "px";
        if (current === target) {
          clearInterval(this.timer);
        }
      }, 20);
    },
  },
  mounted() {
    this.rotaList = JSON.parse(localStorage.getItem("readList"));

    this.classindex = this.rotaList.findIndex((res) => {
      // console.log(res);
      return res.contentId == this.$route.query.id;
    });
    if (this.classindex > 4) {
      this.count = this.classindex - 5;
      setTimeout(() => {
        this.handleright();
      }, 400);
    }
  },
};
</script>

<style lang="less">
.mat_run {
  height: 207px;
  background: #fafafa;
  position: relative;
  .run_top {
    width: 80px;
    height: 28px;
    background: #bfbfbf;
    margin-left: 538px;
    color: #fff;
    text-align: center;
    line-height: 28px;
    font-size: 25px;
    border-radius: 0 0 5px 5px;
    opacity: 0.53;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      background: #e5423e;
      opacity: 1;
    }
  }
  .run_left {
    width: 40px;
    height: 106px;
    background: #bfbfbf;
    border-radius: 0px 10px 10px 0px;
    opacity: 0.53;
    font-size: 25px;
    text-align: center;
    line-height: 106px;
    color: #fff;
    margin-top: 25px;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      background: #e5423e;
      opacity: 1;
    }
  }
  .run_right {
    width: 40px;
    height: 106px;
    background: #bfbfbf;
    border-radius: 10px 0px 0px 10px;
    font-size: 25px;
    text-align: center;
    line-height: 106px;
    color: #fff;
    position: absolute;
    right: 0;
    top: 53px;
    cursor: pointer;
    opacity: 0.53;
    transition: 0.5s;

    &:hover {
      background: #e5423e;
      opacity: 1;
    }
  }
  .rotation {
    width: calc(1153px - 112px);
    height: calc(207px - 53px);
    position: absolute;
    top: 53px;
    left: 50%;
    transform: translate(-50%, 0);
    overflow: hidden;
    .rota {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;

      .rota_item {
        width: 189px;
        display: flex;
        flex-direction: column;
        margin-right: 24px;
        cursor: pointer;

        img {
          width: 189px;
          height: 106px;
          border-radius: 8px;
          object-fit: cover;
        }
        .rota_title {
          width: 100%;
          margin-top: 16px;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .active {
        img {
          border: 5px solid #e5423e;
          box-sizing: border-box;
        }
        .rota_title {
          color: #e5423e;
        }
      }
    }
  }
}
.ishidden {
  height: 0px;
  .run_top {
    transform: translateY(-28px) rotateX(-180deg);
  }
  .run_left,
  .run_right,
  .rotation {
    display: none;
  }
}
</style>