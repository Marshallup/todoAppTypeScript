const createInput = document.getElementById('todo-create') as HTMLTextAreaElement;
const createInputWrap = createInput.parentElement as HTMLElement;
const createInputDelete = createInputWrap.querySelector('.todo-app-header-field__delete') as HTMLElement;
const createInputLabel = createInput.parentElement.querySelector('label') as HTMLLabelElement;
const filterInputs: HTMLCollectionBase = document.querySelectorAll('.todo-app-filter .todo-app-checkbox__item');

createInput.onfocus = function() {
  createInputLabel.classList.add('focus-input');
}
createInput.onblur = function() {
  if (createInput.value) {
    return;
  }
  createInputLabel.classList.remove('focus-input');
}
createInputDelete.onclick = function() {
  createInput.value = '';
  createInputWrap.classList.remove('isValue');
  createInputLabel.classList.remove('focus-input');
}
createInput.addEventListener('input', function () {
  if (this.value) {
    createInputWrap.classList.add('isValue');
  } else {
    createInputWrap.classList.remove('isValue');
  }
});
Array.from(filterInputs).forEach(item => {
  item.addEventListener('change', function() {
    Array.from(filterInputs).forEach(itemEl => {
      const checkbox = itemEl as HTMLInputElement;
      checkbox.checked = false;
    });
    this.checked = true;
  })
});