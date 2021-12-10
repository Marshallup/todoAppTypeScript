require('./ui');
import TodoCreate from "./todo-create";
import TodoList from "./todo-list";

const todoList = new TodoList;
const create =  new TodoCreate(todoList);