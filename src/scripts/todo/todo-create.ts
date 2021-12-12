import { addInputFocus, removeInputValue } from "./../ui";
import TodoList from "./todo-list";
import TodoItem from "./todo-item";
import TodoFilter from "./todo-filter";

export default class TodoCreate
{
  public htmlElement = document.getElementById('todo-create') as HTMLInputElement;

  constructor(public todoList: TodoList, public todoFilter: TodoFilter, public value: string = '') {
    this.htmlElement.value = value;
    this.initEventInputCreate();
    this.initEventCreateTodo(todoList);
  }

  protected initEventInputCreate() {
    if (this.value) {
      addInputFocus();
    }
    this.htmlElement.addEventListener('input', (event: Event) => {
      this.value = this.value;
    });
  }

  protected initEventCreateTodo(todoList: TodoList) {
    this.htmlElement.addEventListener('enter', (event: Event) => {
      todoList.addItem(new TodoItem(this.htmlElement.value));
      removeInputValue();
      this.htmlElement.value = '';

      if (TodoFilter.isHide()) {
        this.todoFilter.doFilter('all', true);
        TodoFilter.showFilter();
      }
    });
  }
}