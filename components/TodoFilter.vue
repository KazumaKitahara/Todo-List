<template>
  <div class="todo-filter">
    <div class="todo-filter__label">TODOの絞り込み</div>
    <Radio v-model="internalFilterState" :radio-data="radioData" name="todo-filter" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Radio from '@/components/common/Radio.vue'
import { TodoStateFilter } from "@/types/todo";
import { RadioData } from "~/types/radio";

export default Vue.extend({
  name: "TodoFilter",
  components: {
    Radio
  },
  model: {
    prop: "filterState",
    event: "change",
  },
  data() {
    return {
      radioData: [
        {
          label: 'すべて',
          value: 'ALL'
        },
        {
          label: '完了',
          value: 'COMPLETE',
        },
        {
          label: '未完了',
          value: 'IN_COMPLETE',
        }
      ] as RadioData[]
    }
  },
  props: {
    filterState: {
      type: String as TodoStateFilter,
      required: true,
    },
  },
  computed: {
    internalFilterState: {
      get() {
        // @ts-ignore
        return this.filterState;
      },
      set(newValue: TodoStateFilter) {
        // @ts-ignore
        this.$emit("change", newValue);
      },
    },
  },
})
</script>

<style lang="scss">
.todo-filter {
  margin-bottom: 16px;

  &__label {
    color: gray;
  }
}
</style>
