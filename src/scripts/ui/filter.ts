import { showAnimElementMedia, removeAnimElement } from './../ui';

const filterInputs = [...document.querySelectorAll<HTMLInputElement>('.todo-app-filter .todo-app-checkbox__item')];
const filterBlock: HTMLElement = document.querySelector('.todo-app-filter-checkboxes');
const filterIcon: HTMLElement = document.querySelector('.todo-app-filter__item-icon');
const filterDelete: HTMLElement = document.querySelector('.todo-app-filter-checkboxes-header__delete');
let disableShowFilter: boolean = false;

filterIcon.onclick = function() {
  if (!disableShowFilter) {
    filterIcon.classList.add('disable');
    showAnimElementMedia(filterBlock, 'animate__fadeInUp');
  }
  disableShowFilter = true;
}
filterDelete.onclick = function() {
  if (disableShowFilter) {
    filterIcon.classList.remove('disable');
    removeAnimElement(filterBlock, () => { filterBlock.classList.remove('show'); }, 'animate__fadeOutDown')
  }
  disableShowFilter = false;
}

filterInputs.forEach(item => {
  item.addEventListener('change', function() {
    removeAllChecked(filterInputs, this.name);
    this.checked = true;
  })
});


function removeAllChecked(checkboxes: Array<HTMLInputElement>, name: String) {
  checkboxes.forEach(checkbox => {
    if (name !== checkbox.name) {
      checkbox.checked = false;
    }
  });
}

export {
  removeAllChecked,
}