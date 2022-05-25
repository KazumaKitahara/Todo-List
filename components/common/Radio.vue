<template>
  <div class="radio">
    <b-form-radio
      class="radio__item"
      v-for="radioDatum in radioData"
      v-model="internalValue"
      :name="name"
      :value="radioDatum.value"
    >
      {{ radioDatum.label }}
    </b-form-radio>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { RadioData } from "~/types/radio";

export default Vue.extend({
  name: 'Radio',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: undefined,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    radioData: {
      type: [] as PropType<RadioData[]>,
      required: true,
    },
  },
  computed: {
    internalValue: {
      get(): any {
        // @ts-ignore
        return this.value;
      },
      set(newValue): void {
        // @ts-ignore
        this.$emit("change", newValue);
      },
    },
  },
})
</script>

<style lang="scss">
.radio {
  &__item{
    > input:checked ~ label::before {
      background-color: $primary !important;
      border-color: $primary !important;
    }
  }
}
</style>
