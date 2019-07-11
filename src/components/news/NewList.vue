<template>
  <div class="newslist_content">
    <div class="mui-scroll-wrapper" style=" position:absolute;top: 40px;bottom: 50px;">
      <div class="mui-scroll">
        <!--这里放置真实显示的DOM内容-->
        <div>
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
              <router-link :to="'/home/newsInfo?id='+item.id">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body newslist_content">
                  <h3>{{ item.title }}</h3>
                  <div>
                    <span class="mui-pull-left">{{ item.add_time | timeFilter }}</span>
                    <span class="mui-pull-right">点击：{{ item.click }}次</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Toast } from "mint-ui";

export default {
  name: "NewList",
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getnewslist();
  },
  mounted() {
    //引入的是在main.js所以需要加上this
    this.mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getnewslist() {
      this.$http.get("/api/getnewslist").then(res => {
        //console.log(res);
        if (res.data.status == 0) {
          this.newsList = res.data.message;
        } else {
          Toast("新闻列表数据请求失败");
        }
      });
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.newslist_content {
  h3 {
    font-size: 14px;
  }
  span {
    font-size: 12px;
    color: #26a3ff;
  }
}
</style>
