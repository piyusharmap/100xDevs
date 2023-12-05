/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
	// create an array to store the todos and also keep the track of total items in list
	constructor() {
		this.todoList = [];
		this.listLength = 0;
	}

	// to add todo, simply push it into the array
	add(todo) {
		this.listLength++;
		this.todoList.push(todo);
	}

	// to remove todo, check if the index is valid or not
	remove(index) {
		// if there are no items in the list return null
		if (this.listLength === 0) {
			return null;
		}

		if (index >= 0 && index < this.listLength) {
			this.listLength--;
			this.todoList.splice(index, 1);
		}
	}

	// to update todo, simply go to the specific index and update with new todo
	update(index, newTodo) {
		if (index >= 0 && index < this.listLength) {
			this.todoList[index] = newTodo;
		}
	}

	getAll() {
		return this.todoList;
	}

	get(index) {
		if (index >= 0 && index < this.listLength) {
			return this.todoList[index];
		} else return null;
	}

	// resets the list with an empty array
	clear() {
		this.todoList = [];
		this.listLength = 0;
	}
}

module.exports = Todo;
