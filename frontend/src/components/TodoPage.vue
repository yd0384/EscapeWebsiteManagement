<template>
	<div>
        <b-card header="My Todo app">
		<b-input-group prepend="new Todo">
            <BaseInputText 
                v-model="newTodoText"
                @keydown.enter="addTodo"
            />
            <b-input-group-append>
                <b-button variants="info" @click="addTodo">append</b-button>
            </b-input-group-append>
        </b-input-group>
		<b-list-group v-if="todos.length">
			<TodoListItem
				v-for="todo in todos"
				:key="todo.id"
				:todo="todo"
				@remove="removeTodo"
			/>
		</b-list-group>
		<p v-else>
			Nothing left in the list. Add a new todo in the input above.
		</p>
        </b-card>
	</div>
</template>

<script>
import BaseInputText from './BaseInputText.vue'
import TodoListItem from './TodoListItem.vue'

let nextTodoId = 1

export default {
	components: {
		BaseInputText, TodoListItem
	},
  data () {
    return {
		newTodoText: '',
        todos: [
            {
                id: nextTodoId++,
                text: 'Learn Vue'
            },
            {
                id: nextTodoId++,
                text: 'Learn about single-file components'
            },
            {
                id: nextTodoId++,
                text: 'Fall in love'
            }
		]
    }
  },
	methods: {
		addTodo () {
			const trimmedText = this.newTodoText.trim()
			if (trimmedText) {
				this.todos.push({
					id: nextTodoId++,
					text: trimmedText
				})
				this.newTodoText = ''
			}
		},
		removeTodo (idToRemove) {
			this.todos = this.todos.filter(todo => {
				return todo.id !== idToRemove
			})
		}
	}
}
</script>