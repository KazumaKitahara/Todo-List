<template>
  <div class="todo">
    <TodoInputForm @click-create="createTodo" />
    <hr />
    <TodoFilter v-model="filterState" />
    <hr />
    <div class="todo__table-wrapper">
      <div class="todo__info">
        {{ filteredTodos.length === 0 ? 'TODOがありません' : `${filteredTodos.length} 件のTODOがあります` }}
        <b-button
          v-if="filteredTodos.length !== 0"
          class="todo__delete-all"
          variant="danger"
          size="sm"
          @click="deleteTodoAllTogether"
        >
          まとめて削除
        </b-button>
      </div>
      <TodoTable
        :todos="filteredTodos"
        :origin-todos="todos"
        @click-state="changeTodoState"
        @click-delete="deleteTodo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uuid } from 'vue-uuid'
import TodoInputForm from "@/components/TodoInputForm.vue"
import TodoFilter from "@/components/TodoFilter.vue"
import TodoTable from "@/components/TodoTable.vue"
import { cloneDeep } from 'lodash'
import { TodoData, TodoStateFilter } from "@/types/todo"

export default Vue.extend({
  layout: 'header',
  components: {
    TodoInputForm,
    TodoFilter,
    TodoTable,
  },
  data() {
    return {
      sessionStorageKey: 'todo-list',
      todos: [] as TodoData[],
      filterState: 'ALL' as TodoStateFilter,
    }
  },
  computed: {
    filteredTodos(): TodoData[] {
      if (this.filterState === 'ALL') return this.todos
      return this.todos.filter(todo => todo.state === this.filterState)
    },
  },
  created() {
    this.initializeTodos()
  },
  methods: {
    /**
     * 作成したTODO一覧を初期化
     *
     * - 過去に作成されていた場合はlocalStorageから取得します
     */
    initializeTodos() {
      this.todos = JSON.parse(
        sessionStorage.getItem(this.sessionStorageKey) || '[]'
      )
    },
    /**
     * TODOを作成
     */
    createTodo(todoFormData: TodoData) {
      this.todos.push(cloneDeep({
        ...todoFormData,
        uuid: uuid.v1()
      }))
      sessionStorage.setItem(
        this.sessionStorageKey,
        JSON.stringify(this.todos)
      )
    },
    /**
     * TODOの状態を変更
     */
    changeTodoState(uuid: string) {
      this.todos = this.todos.map(todo => {
        return todo.uuid === uuid ? {
          ...todo,
          state:
            todo.state === 'COMPLETE'
              ? 'IN_COMPLETE'
              : 'COMPLETE'
        } : todo
      })
      sessionStorage.setItem(
        this.sessionStorageKey,
        JSON.stringify(this.todos)
      )
    },
    /**
     * TODOを削除
     */
    deleteTodo(uuid: string) {
      const targetTodoIndex = this.todos.findIndex(todo => todo.uuid === uuid)
      if(!window.confirm(`${this.todos[targetTodoIndex].name || '無名のTODO'} を削除してもよろしいですか？`)) return

      this.todos.splice(targetTodoIndex, 1)
      sessionStorage.setItem(
        this.sessionStorageKey,
        JSON.stringify(this.todos)
      )
    },
    /**
     * TODOをまとめて削除
     */
    deleteTodoAllTogether() {
      const targetText =
        this.filterState === 'ALL'
            ? '全て'
            : this.filterState === 'COMPLETE'
            ? '完了済'
            : '未完了'
      if(!window.confirm(`${targetText}のTODOを削除してもよろしいですか？`)) return

      if (this.filterState === 'ALL') {
        this.todos.splice(0, this.todos.length)
      } else if (this.filterState === 'COMPLETE') {
        this.todos = this.todos.filter(todo => todo.state !== 'COMPLETE')
      } else {
        this.todos = this.todos.filter(todo => todo.state !== 'IN_COMPLETE')
      }

      sessionStorage.setItem(
        this.sessionStorageKey,
        JSON.stringify(this.todos)
      )
    }
  }
})
</script>

<style lang="scss">
.todo {
  &__table-wrapper {
    max-width: 1000px;
  }

  &__info {
    display: flex;
    align-items: end;
    justify-content: space-between;
    color: gray;
    margin-bottom: 8px;
  }

  &__delete-all {
    border-radius: 2rem;
    border: 2px solid $border-color;
  }
}
</style>
