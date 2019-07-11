<template>
  <div class="goodsbox">
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :auto-fill="false"
      ref="loadmore"
    >
      <ul class="goodslist">
        <li v-for="item in goodslist" :key="item.id" @click="goodsinfo(item.id)">
          <img :src="item.img_url" alt />
          <h3>{{item.title}}</h3>
          <div class="bdinfo">
            <span class="newprice">￥{{item.sell_price}}</span>
            <span class="oldprice">￥{{item.market_price}}</span>
            <p class="mui-clearfix">
              <span class="mui-pull-left">热卖中</span>
              <span class="mui-pull-right">剩余 {{item.stock_quantity}} 件</span>
            </p>
          </div>
        </li>
      </ul>
    </mt-loadmore>
    <!-- <mt-button type="danger" size="large" @click="addgoods">加载更多</mt-button> -->
  </div>
</template>


<script>
// window.onload = function() {
//   document.querySelector(".goodsbox").style.height = document.body.clientHeight;
// };
export default {
  data() {
    return {
      number: 1,
      goodslist: [],
      allLoaded: false
    };
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      this.$http.get("api/getgoods?pageindex=" + this.number).then(res => {
        //console.log(res);
        if (res.data.status == 0) {
          // console.log(res.data.message.length);
          if (this.number == 1) {
            this.$refs.loadmore.onTopLoaded(); // 实现下拉刷新，如果是第一页需要重置下拉状态
            this.goodslist = res.data.message; // 并且为列表赋值
          } else {
            if (res.data.message.length < 10) {
              // 如果返回的数组为空，则把参数设置为true，不再执行加载更多操作
              this.allLoaded = true;
            }
            // 重置上拉状态
            this.$refs.loadmore.onBottomLoaded();
            this.goodslist = this.goodslist.concat(res.data.message);
          }
        }
      });
    },
    addgoods() {
      if (this.allLoaded) {
        document.querySelector(".goodsbox .mint-button").style.display = "none";
        return;
      }
      this.number++;
      this.getgoodslist();
    },
    loadTop() {
      this.goodslist = [];
      this.number = 1;
      this.getgoodslist();
    },
    loadBottom() {
      this.number++;
      this.getgoodslist();
    },
    goodsinfo(id) {
      this.$router.push({ path: "/home/goodsinfo/" + id });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.goodsbox {
  // padding-bottom: 70px;
  padding: 10px 8px 70px;
  height: 100vh;
  overflow: auto;
}
.goodslist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    list-style: none;
    margin-bottom: 8px;
    width: 48%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border: 1px solid #ccc;
    padding: 2px;
    img {
      width: 100%;
    }
    h3 {
      font-size: 14px;
      padding: 8px 0 15px 0;
      height: 60px;
    }
    .bdinfo {
      background-color: #eeeeee;
      width: 98%;
      margin: 0 auto;

      // border-radius: 5px;
      padding: 8px;
      .newprice {
        color: red;
        font-size: 16px;
        font-weight: 700;
        margin-right: 10px;
      }
      .oldprice {
        font-size: 13px;
        color: #8f8f94;
        font-weight: 700;
        text-decoration: line-through;
      }
      p {
        margin-top: 5px;
        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
