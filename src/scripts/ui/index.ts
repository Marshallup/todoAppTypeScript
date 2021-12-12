require('./filter');
const hideClass = 'hide';
const initAnimationClass = 'animate__animated';

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

function animateElement(element: HTMLElement, className: string) {
  if (!element.classList.contains(className)) {
    element.classList.add(className);
  }
  element.classList.add(initAnimationClass);
}

function showAnimElement(element: HTMLElement, className: string) {
  element.classList.remove(hideClass);
  animateElement(element, className);
}

function showAnimElementMedia(element: HTMLElement, animClassName: string, showClassName: string = 'show') {
  element.classList.add(showClassName);
  animateElement(element, animClassName);
}

async function removeAnimElement(element: HTMLElement, cb: Function, className: string) {
  removeAnimationClasses(element);
  element.classList.add(className);
  const duration = parseFloat(getComputedStyle(element).getPropertyValue('animation-duration'));

  element.classList.add(initAnimationClass);

  setTimeout(() => {
    cb();
    element.classList.remove(className);
    element.classList.remove(initAnimationClass);
  }, duration * 1000);
}

function removeAnimationClasses(element: HTMLElement): void {
  const classes: DOMTokenList = element.classList;

  classes.forEach((className: string) => {
    if (className.match('animate')) {
      element.classList.remove(className);
    }
  })
}

export {
  initAnimationClass,
  hideClass,
  addInputFocus,
  removeInputValue,
  showAnimElement,
  removeAnimElement,
  showAnimElementMedia,
}