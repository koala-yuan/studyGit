<template>
  <div class="photoinfo">
    <div class="hd mui-clearfix">
      <h3>{{wenziInfo.title}}</h3>
      <span class="mui-pull-left">发表时间：{{wenziInfo.add_time|timeFilter}}</span>
      <span class="mui-pull-right">点击：{{wenziInfo.click}}次</span>
    </div>
    <hr />

    <div class="bd">
      <vue-preview :slides="slides1" @close="handleClose" class="bdprice"></vue-preview>
      <!-- <ul>
        <li v-for="item in slides1" :key="item.id">
          <img :src="item.src" alt />
        </li>
      </ul>-->
      <p v-html="wenziInfo.content"></p>
    </div>
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comments from "../subcomponents/comment";
export default {
  data() {
    return {
      id: "",
      slides1: [],
      wenziInfo: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    //console.log(this.id);
    this.getpicInfo();
    this.getwenzi();
  },
  methods: {
    getpicInfo() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.data.status == 0) {
          //console.log(res.data);
          res.data.message.forEach(element => {
            element.w = 600;
            element.h = 400;
            element.msrc = element.src;
          });
          this.slides1 = res.data.message;
        }
      });
    },
    getwenzi() {
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        //console.log(res);
        if (res.data.status == 0) {
          //console.log(res.data);
          this.wenziInfo = res.data.message[0];
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "comment-box": comments
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.photoinfo {
  padding: 0 5px;
  text-align: center;
  padding-bottom: 70px;
  .hd {
    h3 {
      color: #26a2ff;
      font-size: 15px;
      margin: 15px 0 10px;
    }
    span {
      font-size: 13px;
      color: #8f8f94;
    }
  }
  .bd {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0;
      justify-content: flex-start;
      padding: 0 8px;
    }
    .bdprice {
      /deep/ figure {
        margin: 0;
        list-style: none;
        margin: 8px;
        width: 27%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        img {
          width: 100%;
          vertical-align: top;
        }
      }
    }

    p {
      text-align: left;
      color: #000;
      font-size: 12px;
      line-height: 25px;
    }
  }
}
</style>
