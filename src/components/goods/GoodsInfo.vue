<template>
  <div class="goodsinfo">
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
      <div class="myball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <div class="goodspic boxshadow">
      <mt-swipe :auto="4000">
        <mt-swipe-item class="piclunbo" v-for="item in piclist" :key="item.id">
          <img :src="item.src" style="height:100%" alt />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="goodstitle boxshadow">
      <h3>{{goodsinfo.title}}</h3>
      <hr />
      <p>
        市场价：
        <span class="old">￥{{goodsinfo.market_price}}</span> &nbsp;
        销售价：
        <span class="now">￥{{goodsinfo.sell_price}}</span>
      </p>
      <div class="mui-clearfix" style="margin-bottom:7px">
        <p class="mui-pull-left" style="margin-top:8px">购买数量：</p>
        <div
          class="mui-numbox mui-pull-left btnbox"
          data-numbox-step="1"
          data-numbox-min="1"
          :data-numbox-max="goodsinfo.stock_quantity"
        >
          <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
          <input class="mui-numbox-input" type="number" />
          <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
      </div>

      <mt-button type="primary" size="small">立即购买</mt-button>
      <mt-button type="danger" size="small" @click="addcart">加入购物车</mt-button>
    </div>
    <div class="goodscanshu boxshadow">
      <h3>商品参数</h3>
      <hr />
      <p>商品货号：{{goodsinfo.goods_no}}</p>
      <p>库存情况：{{goodsinfo.stock_quantity}} 件</p>
      <p style="margin-bottom:20px">上架时间：{{goodsinfo.add_time | timeFilter}}</p>
      <hr />
      <mt-button type="primary" plain size="large" @click="goodsdesc">图文介绍</mt-button>
      <mt-button type="danger" plain size="large" @click="goodscomment">商品评论</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsinfo: [],
      piclist: [],
      ballFlag: false,
      max: 0,
      locallist: []
    };
  },
  created() {
    this.getgoodsinfo();
    this.getpic();
  },
  mounted() {
    this.mui(".btnbox").numbox();
  },
  methods: {
    getgoodsinfo() {
      this.$http.get("api/goods/getinfo/" + this.$route.params.id).then(res => {
        if (res.data.status == 0) {
          //console.log(res.data);
          this.goodsinfo = res.data.message[0];
        }
      });
    },
    getpic() {
      this.$http.get("api/getthumimages/" + this.$route.params.id).then(res => {
        if (res.data.status == 0) {
          //console.log(res.data);
          this.piclist = res.data.message;
        }
      });
    },
    goodsdesc() {
      this.$router.push({ path: "/home/getdesc/" + this.$route.params.id });
    },
    goodscomment() {
      this.$router.push({
        path: "/home/goodscomment/" + this.$route.params.id
      });
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 计算小球的位置,在动画进行的时候计算小球与下面图标的相对距离。通过getBoundingClientRect()方法
      const ball = this.$refs.ball.getBoundingClientRect();
      const badge = document.querySelector("#badge").getBoundingClientRect();
      //console.log(ball, badge);

      var xDist = badge.left - ball.left;
      var yDist = badge.top - ball.top;
      //console.log(xDist, yDist);

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 1s cubic-bezier(.34,-0.68,.83,.67)";

      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    addcart() {
      this.ballFlag = !this.ballFlag;
      var num = this.mui(".mui-numbox")
        .numbox()
        .getValue();
      console.log(num);

      // 点击添加购物车按钮，把数据存在本地存储，需要的值count，id，price，selected

      // 存储的前提是先要取值
      // this.locallist = JSON.parse(localStorage.getItem("car")) || [];
      var goodsinfo = {
        count: num,
        id: this.$route.params.id,
        price: this.goodsinfo.sell_price,
        selected: true
      };

      this.$store.commit("addToCar", goodsinfo);
      // var flag = true;
      // // 获取之后添加，添加之前要判断ｉｄ是否重复，如果重复就只加count，否则才添加数组
      // this.locallist.forEach(item => {
      //   if (item.id == this.$route.params.id) {
      //     item.count = parseInt(item.count) + parseInt(num);
      //     flag = false;
      //   }
      // });
      // if (flag) {
      //   // 如果flag为假说明上面遍历的时候存在id重复，就不执行添加的操作，直接修改count的值
      //   this.locallist = this.locallist.concat([
      //     {
      //       count: num,
      //       id: this.$route.params.id,
      //       price: this.goodsinfo.sell_price,
      //       selected: true
      //     }
      //   ]);
      // }
      // //添加之后再存储
      // localStorage.setItem("car", JSON.stringify(this.locallist));
    }
  },
  watch: {
    // 监听goodsinfo.stock_quantity这个数据的改变，如果一改变就执行这个函数（设置按钮的最大值）
    "goodsinfo.stock_quantity": function(newval, oldval) {
      this.mui(".btnbox")
        .numbox()
        .setOption("max", newval);
    }
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo {
  background-color: #eeeeee;
  padding: 10px 10px 70px;
  position: relative;
  .goodspic {
    background-color: #fff;
    height: 230px;
    .piclunbo {
      padding: 20px;
      text-align: center;
      img {
        height: 200px;
      }
    }
  }
  .goodstitle {
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 10px 20px;
    h3 {
      font-size: 17px;
      font-weight: normal;
    }
    .old {
      text-decoration: line-through;
    }
    .now {
      color: red;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .goodscanshu {
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 10px 20px;
    h3 {
      font-size: 17px;
      font-weight: normal;
    }
    button {
      margin-top: 20px;
    }
  }
  .boxshadow {
    box-shadow: 0 2px 3px rgba($color: #000000, $alpha: 0.2);
    border-radius: 3px;
  }
}

.myball {
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  top: 343px;
  left: 143px;
}
</style>
