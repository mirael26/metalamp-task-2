const WORD_FORMS = {
  guests: ['гость', 'гостя', 'гостей'],
  bedrooms: ['спальня', 'спальни', 'спален'],
  beds: ['кровать', 'кровати', 'кроватей'],
  bathrooms: ['ванная', 'ванные', 'ванных']
}

const getWordForm = (number) => {
  if ((number === 1 || number % 10 === 1) && number !== 11) {
    return 1;
  }
  if ((number < 10 ||
      number > 20) &&
      (number === 2 ||
      number === 3 ||
      number === 4 ||      
      number % 10 === 2 || 
      number % 10 === 3 ||
      number % 10 === 4)) {
    return 2;
  }
  return 3;
}

const getGuestsTitle = (data) => {
  const guestSum = Object.values(data).reduce((a, b) => {
    return +a + +b;
  });
  if (guestSum === 0) {
    return 'Сколько гостей';
  }
  else {
    return `${guestSum} ${WORD_FORMS.guests[getWordForm(guestSum) - 1]}`;
  }
}

const getFacilitiesTitle = (data) => {
  const bedrooms = data['Спальни'] == 0 ? null : `${data['Спальни']} ${WORD_FORMS.bedrooms[getWordForm(data['Спальни']) - 1]}`;
  const beds = data['Кровати'] == 0 ? null : `${data['Кровати']} ${WORD_FORMS.beds[getWordForm(data['Кровати']) - 1]}`;
  const bathrooms = data['Ванные комнаты'] == 0 ? null : `${data['Ванные комнаты']} ${WORD_FORMS.bathrooms[getWordForm(data['Ванные комнаты']) - 1]}`;

  const facilities = [bedrooms, beds, bathrooms].filter(item => item !== null);
  const facilitiesTitle = {
    text: facilities.join(`, `),
    hint: null
  }
  if (facilities.length == 0) {
    facilitiesTitle.text = `Без удобств`;
  }
  if (facilities.length == 3) {
    facilitiesTitle.text = `${facilities.slice(0, -1).join(`, `)}...`;
    facilitiesTitle.hint = facilities.join(`, `);
  }
  return facilitiesTitle;
};

const dropdowns = document.querySelectorAll('.c-dropdown');

dropdowns.forEach((dropdown)=> {
  const title = dropdown.querySelector('.c-dropdown__title');
  const list = dropdown.querySelectorAll('.c-dropdown__item');
  const header = dropdown.querySelector('.c-dropdown__header');
  const main = dropdown.querySelector('.c-dropdown__main');
  const cleanButton = dropdown.querySelector('.c-dropdown__clean');
  const confirmButton = dropdown.querySelector('.c-dropdown__confirm');
  
  const data = {};
  let type = null;
  if (dropdown.classList.contains('c-dropdown--facilities')) {
    type = 'facilities';
  }
  if (dropdown.classList.contains('c-dropdown--guests')) {
    type = 'guests';
  }

  header.onclick = (() => {
    const isOpen = dropdown.classList.contains('open') ? true : false;
    if (isOpen) {
      dropdown.classList.remove('open');
      main.style.display = 'none';
    } 
    else {
      dropdown.classList.add('open');
      main.style.display = 'block';
    }
  });

  list.forEach((item) => {
    const name = item.querySelector('.c-dropdown__item-title');
    const decrementButton = item.querySelector('.c-dropdown__decrement');
    const incrementButton = item.querySelector('.c-dropdown__increment');
    const count = item.querySelector('.c-dropdown__count');

    data[name.textContent] = count.textContent;

    const changeTitle = () => {
      data[name.textContent] = count.textContent;
      if (type === 'guests') {
        title.textContent = getGuestsTitle(data);
      }
      if (type === 'facilities') {
        const facilitiesTitle = getFacilitiesTitle(data)
        title.textContent = facilitiesTitle.text;
        if (facilitiesTitle.hint !== null) {
          title.setAttribute('title', facilitiesTitle.hint);
        }
      }
    }

    decrementButton.onclick = (() => {
      count.textContent --;
      data[name.textContent] = count.textContent;
      if (count.textContent == 0) {
        decrementButton.disabled = true;

        if (Object.values(data).every(value => value == 0)) {
          cleanButton.classList.add('hidden');
        }
      }
      changeTitle();
    });

    incrementButton.onclick = (() => {
      count.textContent ++;
      data[name.textContent] = count.textContent;
      if (decrementButton.disabled = true) {
        decrementButton.disabled = false;
      }
      
      cleanButton.classList.contains('hidden') ? cleanButton.classList.remove('hidden') : '';
      changeTitle();
    });
  })

  if (type === 'guests') {
    console.log('Условие  гости соблюдено');
    cleanButton.onclick = () => {
      list.forEach((item) => {
        const count = item.querySelector('.c-dropdown__count');
        const decrementButton = item.querySelector('.c-dropdown__decrement');

        count.textContent = 0;    
        title.textContent = 'Сколько гостей';             
        decrementButton.disabled = true;
      });
      for (value in data) {
        data[value] = 0;
      }
      cleanButton.classList.add('hidden');
    };

    confirmButton.onclick = () => {
      dropdown.classList.remove('open');
      main.style.display = 'none';
    };
  }
});