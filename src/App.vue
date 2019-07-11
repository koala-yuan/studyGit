<template>
  <div class="vue_container">
    <!-- 头部header -->
    <mt-header fixed title="小毛驴的vue项目" style="z-index:999">
      <!-- <router-link to="/" > -->
      <mt-button icon="back" :slot="flag?'left':''" @click.prevent="goback">返回</mt-button>
      <!-- </router-link> -->
    </mt-header>

    <transition name="my">
      <router-view />
    </transition>

    <!-- 尾部tabbar -->
    <div class="navfloor">
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/member">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopcar">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      flag: true,
      myroure: ""
    };
  },
  mounted: function() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#fff");
    this.mui(".navfloor").on("tap", "a", function() {
      document.location.href = this.href;
    });
  },
  created() {
    //console.log(this.$route.fullPath);
    if (this.$route.fullPath == "/home") {
      this.flag = false;
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  watch: {
    // watch监听路由变化，$route 是自带的方法，第一个参数
    $route(to, from) {
      console.log(to.path);
      if (to.path == "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.vue_container {
  padding: 40px 0 0;
  overflow-x: hidden;
}

.my-enter-active,
.my-leave-active {
  transition: all 0.5s ease;
}

.my-enter {
  opacity: 0;
  transform: translateX(100%);
}

.my-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
</style>
