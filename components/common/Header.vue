<template>
  <div class="header">
    <div class="header__title">
      <span class="header__title--inverse">TODO</span> LIST
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
.header {
  background-color: $secondary;
  height: $header-height;
  display: flex;
  align-items: center;
  padding: 0 16px;
  filter: drop-shadow(0 0 3px $secondary);

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $primary;

    &--inverse {
      display: inline-block;
      padding: 0 8px;
      background-color: $primary;
      color: $secondary;
    }
  }
}
</style>
