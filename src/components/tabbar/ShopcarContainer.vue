<template>
  <div class="shopcar">
    <div class="mui-card" v-for="(item,i) in newList" :key="item.id">
      <!--内容区-->
      <div class="mui-card-content mycard">
        <!-- 左边开关按钮 -->
        <mt-switch
          v-model="$store.getters.getGoodsSelected[item.id]"
          @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"
        ></mt-switch>
        <div class="pic">
          <img :src="item.thumb_path" alt />
        </div>
        <div class="info">
          <h4>{{item.title}}</h4>
          <div class="info_bd">
            <span
              class="mui-pull-left"
              style="color:red;font-weight:700;font-size:14px"
            >￥ {{item.sell_price}}</span>
            <div
              class="mui-numbox mui-pull-left btnbox"
              data-numbox-step="1"
              data-numbox-min="1"
              data-numbox-max="100"
            >
              <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
              <input
                class="mui-numbox-input"
                type="number"
                :value="$store.getters.getGoodsCount[item.id]"
                @change="butchang(item.id,i)"
                ref="mycard"
              />
              <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
            </div>
            <span
              class="mui-pull-left"
              style="color:#26a2ff;font-size:14px"
              @click="remove(item.id,i)"
            >删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card sumcard">
      <div>
        <p>总计：(不含运费)</p>
        <p>
          已勾选商品
          <span class="red">{{$store.getters.getGoodscountsum.count}}</span>件，总价
          <span class="red">￥ {{$store.getters.getGoodscountsum.amout}}</span>
        </p>
      </div>
      <mt-button type="danger">去结算</mt-button>
    </div>
    <p>{{$store.getters.getGoodsSelected}}</p>
    <p>1233{{$store.getters.getGoodscountsum}}</p>
  </div>
</template>

<script>
export default {
  name: "ShopcarContainer",
  data() {
    return {
      isActive: true,
      cartlist: [],
      ids: [],
      count: 1,
      selected: true,
      newList: []
    };
  },
  created() {
    this.getlocal();
  },
  updated() {
    this.mui(".mui-numbox").numbox();
  },
  methods: {
    getlocal() {
      // 获取本地存储的值
      // this.cartlist = this.cartlist.concat(
      //   JSON.parse(localStorage.getItem("car")) || []
      // );
      //console.log(this.cartlist);
      // var obj = { count: 1, id: 88, price: 5780, selected: true };
      // this.cartlist.push(obj);
      // localStorage.setItem("car", JSON.stringify(this.cartlist));

      // 遍历这个数组，取id出来 请求数据库
      //console.log(this.$store.state.car);
      this.cartlist = this.$store.state.car;
      this.cartlist.forEach(item => {
        this.ids.push(item.id);
      });
      //console.log(this.ids, 1111);
      if (this.ids.length <= 0) return;
      // 把取出来的ids数组转为为字符串 用逗号连接
      this.ids = this.ids.join(",");
      console.log(this.ids, 1111);

      this.$http.get("/api/goods/getshopcarlist/" + this.ids).then(res => {
        //console.log(res);
        if (res.data.status == 0) {
          // 拿到数据后，遍历两个数组，目的是为了要把从数据库拿到的数组里的标题和图片地址追加到从本地获取的数组里
          // res.data.message.forEach(itema => {
          //   this.cartlist.forEach(itemb => {
          //     if (itema.id == itemb.id) {
          //       itemb.title = itema.title;
          //       itemb.thumb_path = itema.thumb_path;
          //     }
          //   });
          // });
          this.newList = res.data.message;
          console.log(this.newList, 33333);
          //console.log(this.cartlist, 33333); 拿到完整数组后再渲染页面
        }
      });
    },
    remove(id, index) {
      // 点击之后，先删除页面中的元素
      this.newList.splice(index, 1);
      // 然后在删除car里的数据 和本地存储里的数据
      this.$store.commit("removeFormcar", id);
    },
    selectedChange(id, val) {
      // console.log(id, val);
      this.$store.commit("updateGoods", { id: id, selected: val });
    },
    butchang(id, index) {
      var num = this.$refs.mycard[index].value;
      //console.log(id, num);
      this.$store.commit("btnchange", { id: id, num: num, index: index });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.shopcar {
  background-color: #eee;
  overflow: hidden;
}
.mycard {
  display: flex;
  padding: 15px;
  align-items: center;
  .pic {
    margin: 0 8px;
    /deep/ img {
      width: 60px;
    }
  }
  h4 {
    font-size: 14px;
    font-weight: 700;
  }
  .info_bd {
    span {
      margin-top: 5px;
    }
    .btnbox {
      transform: scale(0.8);
    }
  }
}
.sumcard {
  display: flex;
  align-items: center;
  padding: 10px;
  p {
    font-size: 14px;
    margin-right: 10px;
    .red {
      color: red;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
