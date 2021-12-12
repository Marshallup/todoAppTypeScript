import { removeAnimElement } from './../ui';

export default class TodoItem
{
  public id: string =  `id-${(new Date()).getTime()}`;
  public htmlElement: HTMLElement;
  public done: boolean = false;
  static deleteSelector: string = '.todo-app-list__delete.icon-delete';
  static inputSelector: string = '.todo-app-checkbox__item';

  constructor(public text: string) {
    this.htmlElement = this.createHtmlElement(text);
  };

  private createHtmlElement(text: string): HTMLElement {
    const li: HTMLElement = document.createElement('li');

    const content: string = `
      <label class="todo-app-checkbox">
        <input type="checkbox" class="todo-app-checkbox__item"/>
        <span class="todo-app-checkbox__icon"></span>
      </label>
      <div class="todo-app-list__text">${text}</div>
      <div class="todo-app-list__delete icon-delete"></div>
    `;
    li.classList.add(...['todo-app-list__item', 'hide']);
    li.innerHTML = content;

    return li;
  }

  public doDone(isDone: boolean): void {
    if (isDone) {
      this.done = true;
      this.htmlElement.classList.add('done');
    } else {
      this.done = false;
      this.htmlElement.classList.remove('done');
    }
  }

  public delete(list: Array<TodoItem>): boolean {
    const parent = this.htmlElement.parentNode as ParentNode;

    const finded = list.findIndex(item => item.id === this.id);
    if (finded >= 0) {
      removeAnimElement(this.htmlElement, () => { parent.removeChild(this.htmlElement) }, 'animate__fadeOutDown');
      list.splice(finded, 1);
      return true;
    }
    return false;
  }

}