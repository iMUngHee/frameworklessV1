import { search } from './api.mjs';

const input = document.querySelector('.SearchInput__input');
const app = document.querySelector('.App');

let results = [];
let lists = [];

input.focus();

input.addEventListener('input', async (event) => {
  const {
    target: { value },
  } = event;

  if (!value) {
    results = [];
    render();
    return;
  }

  results = await search(value);
  render(value);
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
  e.preventDefault();
  const suggestion = document.querySelector('.Suggestion');
  if (!suggestion) return;
  const ul = suggestion.querySelector('ul');
  let done = false;
  switch (e.key) {
    case 'ArrowUp':
      ul.childNodes.forEach((node) => {
        if (!node.className || done) return;
        if (node === ul.firstChild) ul.lastChild.className = node.className;
        else node.previousSibling.className = node.className;
        node.className = '';
        done = true;
      });
      break;
    case 'ArrowDown':
      ul.childNodes.forEach((node) => {
        if (!node.className || done) return;
        if (node === ul.lastChild) ul.firstChild.className = node.className;
        else node.nextSibling.className = node.className;
        node.className = '';
        done = true;
      });
      break;
    default:
      break;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  const suggestion = document.querySelector('.Suggestion');
  if (!suggestion) return;
  const target = suggestion.querySelector('.Suggestion__item--selected');

  window.alert(target.innerText);

  const ul = document.querySelector('.SelectedLanguage ul');
  ul.innerHTML = null;

  lists = lists.filter((li) => li !== target.innerText);
  lists.push(target.innerText);
  if (lists.length > 5) lists.shift();

  lists.forEach((text) => {
    const li = document.createElement('li');
    li.innerText = text;
    ul.appendChild(li);
  });
});

function render(value = '') {
  let suggestion = document.querySelector('.Suggestion');
  if (!results.length) {
    if (suggestion) app.removeChild(suggestion);
    return;
  }

  if (!suggestion) {
    suggestion = document.createElement('div');
    suggestion.className = 'Suggestion';
  }

  let ul = suggestion.querySelector('ul');
  if (!ul) ul = document.createElement('ul');
  ul.innerHTML = null;

  results.map((lang) => {
    const li = document.createElement('li');
    li.innerText = lang;

    const start_index = li.innerText.toLowerCase().indexOf(value.toLowerCase());
    const last_index = start_index + value.length;

    li.innerHTML =
      li.innerText.slice(0, start_index) +
      `<span class="Suggestion__item--matched">${li.innerText.slice(
        start_index,
        last_index,
      )}</span>` +
      li.innerText.slice(last_index);

    li.addEventListener('click', (e) => {
      e.preventDefault();
      const suggestion = document.querySelector('.Suggestion');
      if (!suggestion) return;

      const ul = document.querySelector('.SelectedLanguage ul');
      ul.innerHTML = null;

      lists = lists.filter((li) => li !== e.target.innerText);
      lists.push(e.target.innerText);
      if (lists.length > 5) lists.shift();

      lists.forEach((text) => {
        const li = document.createElement('li');
        li.innerText = text;
        ul.appendChild(li);
      });

      window.alert(e.target.innerText);
    });

    ul.appendChild(li);
  });

  ul.firstChild.className = 'Suggestion__item--selected';

  suggestion.appendChild(ul);
  app.appendChild(suggestion);
}
