const filterInputs: HTMLCollectionBase = document.querySelectorAll('.todo-app-filter .todo-app-checkbox__item');

Array.from(filterInputs).forEach(item => {
  item.addEventListener('change', function() {
    Array.from(filterInputs).forEach(itemEl => {
      const checkbox = itemEl as HTMLInputElement;
      checkbox.checked = false;
    });
    this.checked = true;
  })
});