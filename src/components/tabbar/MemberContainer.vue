<template>
  <div class="member">
    <h1>会员</h1>
    <button @click="aaa">加</button>
    <button @click="bbb">减</button>
    <input type="text" :value="$store.state.count" />
  </div>
</template>

<script>
export default {
  name: "MemberContainer",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    aaa() {
      console.log(123);
      this.$store.commit("addcount");
    },
    bbb() {
      this.$store.commit("jiancount", [1, 2]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
