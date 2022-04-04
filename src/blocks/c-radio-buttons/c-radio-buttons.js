const radioButtonsComponents = document.querySelectorAll('.c-radio-buttons');

radioButtonsComponents.forEach((radioButtonsComponent) => {

  const radioButtons = radioButtonsComponent.querySelectorAll('.c-radio-buttons__item');
    
  const radios = [];
  const inputs = [];
    
  radioButtons.forEach((radioButton) => {

    const currentRadio = radioButton.querySelector('.c-radio-buttons__radio');
    const currentInput = radioButton.querySelector('.c-radio-buttons__input');

    radios.push(currentRadio);
    inputs.push(currentInput);

    const checkRadioMarker = () => {
      radios.forEach(el => {
        el.classList.remove('c-radio-buttons__radio--checked');
      });
      currentRadio.classList.add('c-radio-buttons__radio--checked');
    };

    currentInput.onchange = (() => {
      if (currentRadio.classList.contains('c-radio-buttons__radio--checked')) {
        return;
      } else {
        checkRadioMarker();
      }
    });

    currentRadio.onclick = (() => {
      if (currentInput.checked) {
        return;
      } else {
        checkRadioMarker();
        currentInput.checked = true;
      }
    });
  });
});