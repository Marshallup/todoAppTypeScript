import { addInputFocus, removeInputValue } from "./ui";
import TodoList from "./todo-list";
import TodoItem from "./todo-item";

export default class TodoCreate
{
  public htmlElement = document.getElementById('todo-create') as HTMLInputElement;

  constructor(public todoList: TodoList, public value: string = '') {
    this.htmlElement.value = value;
    this.initEventInputCreate();
    this.initEventCreateTodo(todoList);
  }

  public initEventInputCreate() {
    const $context: TodoCreate = this;
    if (this.value) {
      addInputFocus();
    }
    this.htmlElement.addEventListener('input', function(event: Event) {
      $context.value = this.value;
    });
  }

  protected initEventCreateTodo(todoList: TodoList) {
    const $context = this as TodoCreate;
    this.htmlElement.addEventListener('enter', function(event: Event) {
      todoList.addItem(new TodoItem(this.value));
      removeInputValue();
      $context.value = '';
    });
  }
}