import TodoItem from "./todo-item";
import TodoFilter from "./todo-filter";
import { showAnimElement } from "../ui";

export default class TodoList
{
  public htmlElement: HTMLElement = document.getElementById('todo-app');
  public list: TodoItem[] = [];

  public addItem(item: TodoItem) {
    this.list.push(item);
    this.htmlElement.appendChild(item.htmlElement);
    showAnimElement(item.htmlElement, 'animate__fadeIn');
    this.initEventTodoChecked(item);
    this.initEventTodoDelete(item);
  }

  protected initEventTodoChecked(todo: TodoItem): void {
    const input = todo.htmlElement.querySelector(TodoItem.inputSelector) as HTMLInputElement;

    input.addEventListener('click', function(event: Event) {
      todo.doDone(this.checked);
    });
  }

  protected initEventTodoDelete(todo: TodoItem): void {
    const deleteEl = todo.htmlElement.querySelector(TodoItem.deleteSelector) as HTMLElement;

    deleteEl.addEventListener('click', (event: Event) => {
      if (todo.delete(this.list)) {
        if (!TodoFilter.isHide() && !this.list.length) {
          TodoFilter.hideFilter();
        }
      }
    });
  }

}