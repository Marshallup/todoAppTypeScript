import TodoItem from "./todo-item";

export default class TodoList
{
  public htmlElement: HTMLElement = document.getElementById('todo-app');
  public list: TodoItem[] = [];

  public addItem(item: TodoItem) {
    this.list.push(item);
    this.htmlElement.appendChild(item.htmlElement);
    this.initEventTodoChecked(item);
    this.initEventTodoDelete(item);
  }

  protected initEventTodoChecked(todo: TodoItem): void {
    const li = todo.htmlElement as HTMLElement;
    const input = li.querySelector('.todo-app-checkbox__item') as HTMLInputElement;

    input.addEventListener('click', function(event: Event) {
      if (this.checked) {
        todo.done = true;
        li.classList.add('done');
      } else {
        todo.done = false;
        li.classList.remove('done');
      }
    });
  }

  protected initEventTodoDelete(todo: TodoItem): void {
    const li = todo.htmlElement as HTMLElement;
    const deleteEl = li.querySelector('.todo-app-list__delete.icon-delete') as HTMLElement;
    const context: TodoList = this;

    deleteEl.addEventListener('click', function(event: Event) {
      context.deleteTodo(todo);
    });
  }

  public deleteTodo(todo: TodoItem) {
    const li = todo.htmlElement as HTMLElement;
    const parent = li.parentNode as ParentNode;

    const finded = this.list.findIndex(item => item.id === todo.id);
    if (finded >= 0) {
      parent.removeChild(li);
      this.list.splice(finded, 1);
    }
  }
}