<template>
  <div>
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入你要吐槽的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click.prevent="postComment">发表评论</mt-button>
    <ul class="comment_content">
      <li v-for="(item,i) in comments" :key="Math.floor(Math.random()*10000000+1)+item.add_time">
        <p>
          第{{i+1}}楼
          &nbsp;&nbsp;用户：{{item.user_name}} 发表时间：{{item.add_time |timeFilter}}
        </p>
        <div>{{item.content==='undefined'? '没有评论啦':item.content}}</div>
      </li>
    </ul>
    <button
      class="mint-button mint-button--danger mint-button--large is-plain"
      @click.prevent="addcomment"
    >点击加载更多</button>
  </div>
</template>

<script>
import { log } from "util";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      comments: [],
      msg: ""
    };
  },
  created() {
    //console.log(this.id, 123456);
    this.getcomments();
  },
  methods: {
    getcomments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(res => {
          //console.log(res.data);
          if (res.data.status == 0) {
            this.comments = this.comments.concat(res.data.message);
          } else {
            Toast("获取评论数据失败");
          }
        });
    },
    addcomment() {
      this.pageindex++;
      this.getcomments();
    },
    postComment() {
      if (this.msg.trim() == "") return Toast("评论内容不能为空");
      this.$http
        .post("api/postcomment/" + this.id, { content: this.msg })
        .then(res => {
          //console.log(res);
          if (res.data.status == 0) {
            //console.log(1233412);
            this.comments.unshift({
              user_name: "小毛驴",
              add_time: Date.now(),
              content: this.msg
            });
            this.msg = "";
          } else {
            Toast("提交评论数据失败");
          }
        });
    }
  },
  props: ["id"]
};
</script>




<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
textarea {
  height: 85px;
  font-size: 14px;
  margin: 0;
}
.comment_content {
  text-align: left;
  margin-top: 10px;
  li {
    list-style: none;
    background-color: #f1f1f1;
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 8px;
    p {
      margin-bottom: 5px;
    }
  }
}
hr {
  margin: 10px 0;
}
h3 {
  text-align: left;
  font-size: 18px;
  margin: 10px 0;
}
</style>
