require('./filter');

const createInput = document.getElementById('todo-create') as HTMLTextAreaElement;
const createInputWrap = createInput.parentElement as HTMLElement;
const createInputDelete = createInputWrap.querySelector('.todo-app-header-field__delete') as HTMLElement;
const createInputLabel = createInput.parentElement.querySelector('label') as HTMLLabelElement;

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
createInput.addEventListener('keypress', function(event: KeyboardEvent) {
  if (event.code === 'Enter') {
    event.preventDefault();
    const enter = new CustomEvent("enter", {
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    if (this.value) {
      this.dispatchEvent(enter);
    }
    return false;
  }
});

function addInputFocus(): void {
  createInput.focus();
}

function removeInputValue(): void {
  createInput.value = '';
  createInputWrap.classList.remove('isValue');
}

export {
  addInputFocus,
  removeInputValue,
}