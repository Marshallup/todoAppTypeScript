require('./ui');
import TodoCreate from "./todo/todo-create";
import TodoFilter from "./todo/todo-filter";
import TodoList from "./todo/todo-list";

const todoList = new TodoList;
const todoFilter = new TodoFilter(todoList);
new TodoCreate(todoList, todoFilter);