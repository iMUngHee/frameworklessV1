/**
 * @type {HTMLElement}
 */
let template;

const getTemplate = () => {
  if (!template) {
    template = document.getElementById('app');
  }

  return template.content.firstElementChild.cloneNode(true);
};

/**
 * @param {Element} targetElement
 */
const addEvents = (targetElement, events) => {
  targetElement
    .querySelector('.SearchInput__input')
    .addEventListener('input', (e) => {
      events.searchItem(e.target.value);
    });

  targetElement
    .querySelector('.SearchInput__input')
    .addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter')
        return;
      e.preventDefault();

      if (e.key === 'Enter') events.alertItem();
      else events.moveItem(e.key);
    });
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);

  newApp.innerHTML = '';
  newApp.appendChild(getTemplate());

  addEvents(newApp, events);

  return newApp;
};
