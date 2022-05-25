<template>
  <div class="todo-input-form">
    <div class="todo-input-form__item">
      <div class="todo-input-form__item-label">名称 : </div>
      <b-form-input v-model="todoFormData.name"></b-form-input>
    </div>
    <div class="todo-input-form__item">
      <div class="todo-input-form__item-label">コメント : </div>
      <b-form-textarea v-model="todoFormData.comment"></b-form-textarea>
    </div>
    <b-button class="todo-input-form__create" @click="emitClickCreate">TODOを作成</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {TodoData} from "@/types/todo";
import {cloneDeep} from "lodash";

export default Vue.extend({
  name: "TodoInputForm",
  data() {
    return {
      todoFormData: {} as TodoData,
      initialTodoFormData: {
        name: '',
        uuid: '',
        comment: '',
        state: 'IN_COMPLETE',
      } as TodoData,
    }
  },
  created() {
    this.initializeTodoFormData()
  },
  methods: {
    /**
     * TODOの入力フォームの情報を初期化
     */
    initializeTodoFormData() {
      this.todoFormData = cloneDeep(this.initialTodoFormData)
    },
    emitClickCreate() {
      this.$emit('click-create', this.todoFormData)
      this.initializeTodoFormData()
    },
  }
})
</script>

<style lang="scss" scoped>
.todo-input-form {
  max-width: 400px;

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &-label {
      width: 8rem;
      font-weight: $font-weight-bold;
    }
  }

  &__create {
    border-radius: 2rem;
    border: 2px solid $border-color;
    color: white;
    background-color: $primary;
    &:hover {
      background-color: #2a99ac;
    }
    &:active {
      background-color: #2a99ac !important;
    }
  }
}
</style>
