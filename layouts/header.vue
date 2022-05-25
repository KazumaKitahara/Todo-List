<template>
  <div>
    <Header />
    <div class="header-layout">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/common/Header.vue'

export default Vue.extend({
  name: "header",
  components: {
    Header,
  }
})
</script>

<style lang="scss" scoped>
.header-layout {
  height: calc(100vh - #{$header-height});
  padding: 24px 16px;
}
</style>
