<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in cateLise"
            :key="item.id"
            :data-id="item.id"
            href="javascript:;"
            @tap.prevent="getPicInfo(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <ul class="photolist">
      <li v-for="item in picInfoList" :key="item.id">
        <router-link :to="'/home/photoInfo?id='+item.id">
          <div class="bgwenzi">
            <h3>{{item.title}}</h3>
            <p v-html="item.zhaiyao" class="content_info"></p>
          </div>
          <div class="bgimg">
            <img v-lazy="item.img_url" alt />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Lazyload } from "mint-ui";
export default {
  data() {
    return {
      cateLise: [],
      cateid: 0,
      picInfoList: []
    };
  },
  created() {
    this.getAllcate();
    this.getPicInfo(0);
  },
  mounted() {
    //引入的是在main.js所以需要加上this
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllcate() {
      this.$http.get("api/getimgcategory").then(res => {
        // console.log(res);
        res.data.message.unshift({ title: "全部", id: 0 });
        this.cateLise = res.data.message;
        console.log(this.cateLise);
      });
    },
    getPicInfo(id) {
      this.cateid = id;
      this.$http.get("api/getimages/" + this.cateid).then(res => {
        if (res.data.status == 0) {
          //console.log(res.data);
          this.picInfoList = res.data.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.photolist {
  padding: 0 10px;
  width: 100%;
  li {
    width: 100%;
    margin: 10px auto;
    list-style: none;
    position: relative;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    .bgwenzi {
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      color: #fff;
      h3 {
        font-size: 14px;
        margin: 5px 0;
      }
      .content_info {
        color: #fff;
        line-height: 20px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /*超出3行部分显示省略号，去掉该属性 显示全部*/
        -webkit-box-orient: vertical;
        width: 100%;
      }
    }
    .bgimg {
      width: 100%;
      height: 100%;
      position: relative;
      top: 0;
      left: 0;
      z-index: -1;

      img {
        vertical-align: top;
        width: 100%;
      }
    }
  }
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
}
</style>
