export default class TodoItem
{
  public id: string = 'id' + (new Date()).getTime();
  public htmlElement: HTMLElement;
  public done: boolean = false;

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
    li.classList.add('todo-app-list__item');
    li.innerHTML = content;

    return li;
  }

}