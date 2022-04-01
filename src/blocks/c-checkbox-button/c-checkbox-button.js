const checkboxButtons = document.querySelectorAll('.c-checkbox-button');

checkboxButtons.forEach((checkboxButton) => {
  const checkbox = checkboxButton.querySelector('.c-checkbox-button__checkbox');
  const input = checkboxButton.querySelector('.checkbox-button__input');

  input.onchange = (() => {
    if (input.checked) {
      if (!checkbox.classList.contains('c-checkbox-button__checkbox--checked')) {
        checkbox.classList.add('c-checkbox-button__checkbox--checked');
      }
    } else {
      checkbox.classList.remove('c-checkbox-button__checkbox--checked');
    }});

  checkbox.onclick = (() => {
    if (checkbox.classList.contains('c-checkbox-button__checkbox--checked')) {
      input.checked = false;
      checkbox.classList.remove('c-checkbox-button__checkbox--checked');
    } else {
      input.checked = true;
      checkbox.classList.add('c-checkbox-button__checkbox--checked');
    }});
});