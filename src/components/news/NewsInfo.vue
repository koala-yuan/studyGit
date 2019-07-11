<template>
  <div class="newsifon">
    <h3>{{newsinfo.title}}</h3>
    <div class="mui-clearfix">
      <span class="mui-pull-left">发表时间：{{newsinfo.add_time |timeFilter}}</span>
      <span class="mui-pull-right">点击：{{newsinfo.click}} 次</span>
    </div>
    <hr />
    <div class="infoContent">
      <p v-html="newsinfo.content"></p>
    </div>
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from "../subcomponents/comment";

export default {
  name: "NewsInfo",
  data() {
    return {
      newsinfo: "",
      id: ""
    };
  },
  created() {
    var id = this.$route.query.id;
    this.id = id;
    this.getnewsinfo();
  },
  methods: {
    getnewsinfo() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        console.log(res.data);
        this.newsinfo = res.data.message[0];
      });
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>

<style lang="scss" scoped>
.newsifon {
  padding: 0 3px 70px;
  text-align: center;
  h3 {
    font-size: 16px;
    color: #ff0000;
    margin: 15px 0;
  }
  span {
    color: #26a2ff;
    font-size: 13px;
  }
  .infoContent {
    text-align: left;
  }
}
</style>
