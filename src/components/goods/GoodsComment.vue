<template>
  <div>
    <comm-box :id="id"></comm-box>
  </div>
</template>

<script>
import comment from "../subcomponents/comment";
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  components: {
    "comm-box": comment
  }
};
</script>

<style lang="scss" scoped>
</style>
