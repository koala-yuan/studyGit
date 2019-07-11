<template>
  <div class="home">
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunboLsit" :key="item.id">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格列表区域 -->
    <div class="navList">
      <ul class="mui-clearfix">
        <li>
          <router-link to="home/newList">
            <img src="../../images/menu1(1).png" alt />
            <p>新闻咨询</p>
          </router-link>
        </li>
        <li>
          <router-link to="home/photolist">
            <img src="../../images/menu2.png" alt />
            <p>图片分享</p>
          </router-link>
        </li>
        <li>
          <router-link to="home/goodslist">
            <img src="../../images/menu3.png" alt />
            <p>商品购买</p>
          </router-link>
        </li>
        <li>
          <router-link to="home/newList">
            <img src="../../images/menu4.png" alt />
            <p>留言反馈</p>
          </router-link>
        </li>
        <li>
          <router-link to="home/newList">
            <img src="../../images/menu5.png" alt />
            <p>视频专区</p>
          </router-link>
        </li>
        <li>
          <router-link to="home/newList">
            <img src="../../images/menu6.png" alt />
            <p>联系我们</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeContainer",
  data() {
    return {
      lunboLsit: []
    };
  },
  created: function() {
    this.getlunbo();
  },
  methods: {
    getlunbo() {
      this.$http.get("api/getlunbo").then(res => {
        //console.log(res);
        this.lunboLsit = res.data.message;
      });
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  &:nth-child(1) {
    background-color: pink;
  }
  &:nth-child(2) {
    background-color: skyblue;
  }
  &:nth-child(3) {
    background-color: blueviolet;
  }
  > img {
    height: 100%;
    width: 100%;
  }
}
* {
  margin: 0;
  padding: 0;
}
.navList {
  ul {
    li {
      list-style: none;
      width: calc(100% / 3);
      float: left;
      margin-top: 20px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      a {
        display: block;
      }
      p {
        font-size: 13px;
      }
    }
  }
}
</style>
