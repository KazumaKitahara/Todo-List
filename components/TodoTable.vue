<template>
  <b-table
    class="todo-table"
    :items="todos"
    :fields="tableFields"
    sticky-header
    borderless
    thead-tr-class="todo-table__header"
    :tbody-tr-class="todoTableBodyRowClass"
  >
    <template #table-colgroup="scope">
      <col
        v-for="field in scope.fields"
        :key="field.key"
        :style="{ width: field.width ? field.width : 'auto' }"
      />
    </template>
    <template #cell(id)="{ item: todo }">
      <div class="todo-table__id">{{ idForDisplay(todo.uuid) }}</div>
    </template>
    <template #cell(name)="{ item: todo }">
      {{ todo.name }}
    </template>
    <template #cell(comment)="{ item: todo }">
      {{ todo.comment }}
    </template>
    <template #cell(state)="{ item: todo }">
      <div class="todo-table__state-wrapper">
        <b-button
          class="todo-table__state"
          :variant="
          todo.state === 'COMPLETE'
            ? 'secondary'
            : 'info'
        "
          size="sm"
          @click="emitEvent('click-state', todo.uuid)"
        >
          {{ todo.state === 'COMPLETE' ? '完了' : '未完了' }}
        </b-button>
      </div>
    </template>
    <template #cell(deleted)="{ item: todo }">
      <div class="todo-table__delete-wrapper">
        <b-button
          class="todo-table__delete"
          size="sm"
          variant="danger"
          @click="emitEvent('click-delete', todo.uuid)"
        >
          削除
        </b-button>
      </div>
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { getTodoTableFields } from "@/utils/todo";
import { TodoData } from "@/types/todo";

export default Vue.extend({
  name: "TodoTable",
  props: {
    todos: {
      type: [] as PropType<TodoData[]>,
      required: true,
    },
    originTodos: {
      type: [] as PropType<TodoData[]>,
      required: true,
    },
  },
  computed: {
    tableFields() {
      return getTodoTableFields();
    },
  },
  methods: {
    todoTableBodyRowClass(todo: TodoData) {
      const commonClass = ['todo-table__row']
      return todo.state === 'COMPLETE'
        ? commonClass.concat(['todo-table__row--completed'])
        : commonClass
    },
    emitEvent(eventName: 'click-state' | 'click-delete', emitValue: any) {
      this.$emit(eventName, emitValue)
    },
    idForDisplay(uuid: string) {
      return this.originTodos.findIndex(todo => todo.uuid === uuid) + 1
    },
  }
})
</script>

<style lang="scss">
.todo-table {
  word-break: break-all;
  border: 1px solid $border-color;

  &__header {
    filter: drop-shadow(0 -3px 3px $secondary);
  }

  &__row {
    background-color: white;

    &:not(:last-of-type) {
      border-bottom: 1px solid $border-color;
    }

    &--completed {
      background-color: lightgray;
    }
  }

  &__id {
    min-width: 30px;
  }

  &__state-wrapper {
    width: 60px;
  }

  &__delete {
    border-radius: 2rem;
    border: 2px solid $border-color;

    &-wrapper {
      width: 48px;
    }
  }
}
</style>
