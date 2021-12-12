import TodoList from "./todo-list";
import { removeAllChecked } from "../ui/filter";
import { hideClass } from "../ui";
import { showAnimElement, removeAnimElement } from "../ui";

export default class TodoFilter
{
  public checkboxes: Array<HTMLInputElement>;
  public show: boolean = false;
  protected curTypeFilter: string = 'all';
  static htmlElement: HTMLElement = document.getElementById('todo-filter');
  static checkboxSelector: string = '.todo-app-checkbox__item';
  static clearSelector: string = '.todo-app__btn';

  constructor(public todoList: TodoList) {
    this.checkboxes = [...TodoFilter.htmlElement.querySelectorAll<HTMLInputElement>(TodoFilter.checkboxSelector)];
    this.initEventFilter();
    this.initEventClearAll();
  }

  protected initEventFilter() {
    this.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.doFilter(checkbox.name);
      });
    })
    
  }

  public doFilter(filterName: string, changeCheckbox: boolean = false) {
    if (this.curTypeFilter !== filterName && this.todoList.list.length) {
      this.curTypeFilter = filterName;

      switch(filterName) {
        case 'done': {
          this.todoList.list.forEach(item => {
            if (item.done) {
              item.htmlElement.classList.remove(hideClass);
            } else {
              item.htmlElement.classList.add(hideClass);
            }
          });
          break;
        }
        case 'active': {
          this.todoList.list.forEach(item => {
            if (item.done) {
              item.htmlElement.classList.add(hideClass);
            } else {
              item.htmlElement.classList.remove(hideClass);
            }
          });
          break;
        }
        default: {
          this.todoList.list.forEach(item => {
            item.htmlElement.classList.remove(hideClass);
          });
          break;
        }
      }

      if (changeCheckbox) {
        TodoFilter.htmlElement.querySelector<HTMLInputElement>(`${TodoFilter.checkboxSelector}[name="${this.curTypeFilter}"]`).checked = true;
        removeAllChecked(this.checkboxes, this.curTypeFilter);
      }

    }
  }

  protected initEventClearAll() {
    const clearBtn = TodoFilter.htmlElement.querySelector<HTMLButtonElement>(TodoFilter.clearSelector);

    clearBtn.addEventListener('click', () => {
      if (this.todoList.list.length) {
        this.todoList.list = [];
        Array.from(this.todoList.htmlElement.children).forEach(element => {
          const htmlEl = element as HTMLElement;
          removeAnimElement(htmlEl, () => { this.todoList.htmlElement.removeChild(htmlEl); }, 'animate__fadeOut');
        });
        TodoFilter.hideFilter();
      }
    })
  }

  static hideFilter() {
    removeAnimElement(TodoFilter.htmlElement, () => { TodoFilter.htmlElement.classList.add(hideClass); }, 'animate__fadeOut');
  }

  static showFilter() {
    showAnimElement(TodoFilter.htmlElement, 'animate__fadeIn');
  }

  static isHide() {
    return TodoFilter.htmlElement.classList.contains(hideClass);
  }

}