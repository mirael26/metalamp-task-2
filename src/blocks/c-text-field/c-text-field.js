const DAY_MASK = '31';
const MONTH_MASK = '12';
const MIN_YEAR_MASK = '1900';
const MAX_YEAR_MASK = '2020';

const input = document.querySelector('.c-text-field__masked-input');
let prevValue = '';

const deleteSymbols = (count, data) => {
  input.setAttribute('readonly', 'readonly');
  setTimeout(() => {
    input.value = Array.from(data).slice(0,-count).join('');  
    input.removeAttribute('readonly', 'readonly');
  }, 500);
}

input.oninput = () => {
  const value = input.value;
  if (value.length > prevValue.length) {

    if (isNaN(value.charAt(value.length -1)) && value.charAt(value.length -1) !== '.' && value.charAt(value.length -1) !== ',') {
      deleteSymbols(1, value);
      return;
    }  

    if (value.charAt(value.length -1) == ',') {
      input.value = `${Array.from(value).slice(0,-1).join('')}.`
    }

    if (value.length > 10) {
      deleteSymbols(1, value);
      return;
    }  

    if (value.charAt(value.length -1) === '.') {
      if (value.length == 2 || value.length == 5) {
        if (value.charAt(value.length -2) === '0') {
          deleteSymbols(1, value);
          return;
        }
        input.value = `${Array.from(value).slice(0,-2).join('')}0${value.charAt(value.length-2)}.`;
        prevValue = input.value;
        return;
      }    
      deleteSymbols(1, value);
      return;
    }
    
    if (value.length == 2) {
      if (Array.from(value).slice(-2).join('') > DAY_MASK) {
        deleteSymbols(2, value);
        return;
      }
      input.value = `${value}.`;
    }

    if (value.length == 5) {
      if (Array.from(value).slice(-2).join('') > MONTH_MASK) {
        deleteSymbols(2, value);
        return;
      }
      input.value = `${value}.`;
    }

    if (value.length == 10 &&
        (Array.from(value).slice(-4).join('') > MAX_YEAR_MASK ||
        Array.from(value).slice(-4).join('') < MIN_YEAR_MASK)) {
      deleteSymbols(4, value);
      return;
    }
  }
  prevValue = input.value;
}