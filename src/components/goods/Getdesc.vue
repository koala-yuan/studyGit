<template>
  <div class="descinfo">
    <h3>{{descinfo.title}}</h3>
    <hr />
    <p v-html="descinfo.content"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      descinfo: ""
    };
  },
  created() {
    this.getdesc();
  },
  methods: {
    getdesc() {
      this.$http.get("api/goods/getdesc/" + this.$route.params.id).then(res => {
        if (res.data.status == 0) {
          //console.log(res.data);
          this.descinfo = res.data.message[0];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.descinfo {
  padding: 3px;
  h3 {
    font-size: 17px;
    color: #226aff;
    text-align: center;
    margin: 10px 0;
  }
  p {
    /deep/ img {
      width: 100%;
      display: block;
    }
  }
}
</style>
