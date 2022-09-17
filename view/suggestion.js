/**
 * @type {HTMLElement}
 */
let template;
let highlight;

const createNewSuggestionNode = () => {
  if (!template) {
    template = document.getElementById('suggestion-item');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const createNewHighlightNode = () => {
  if (!highlight) {
    highlight = document.getElementById('highlight');
  }

  return highlight.content.firstElementChild.cloneNode(true);
};

const highlightWrapper = (element, query) => {
  const newElement = element.cloneNode(true);
  const highlighted = createNewHighlightNode();

  const start_index = element.textContent
    .toLowerCase()
    .indexOf(query.toLowerCase());
  const last_index = start_index + query.length;

  highlighted.textContent = element.textContent.slice(start_index, last_index);

  newElement.innerHTML = '';
  newElement.innerHTML += element.innerText.slice(0, start_index);
  newElement.innerHTML += highlighted.outerHTML;
  newElement.innerHTML += element.innerText.slice(last_index);

  // console.dir(highlighted);

  // console.log(newElement);

  return newElement;
};

const getSuggestionElement = (result, idx, query) => {
  const element = createNewSuggestionNode();

  element.textContent = result.text;
  element.dataset.index = idx;
  if (result.selected) element.classList.add('Suggestion__item--selected');

  return highlightWrapper(element, query);
};

export default (targetElement, state, events) => {
  const { results, query } = state;
  const newSuggestions = targetElement.cloneNode(true);
  const ul = document.createElement('ul');

  newSuggestions.innerHTML = '';
  if (results.length < 1) newSuggestions.style.display = 'none';

  results
    .map((result, idx) => getSuggestionElement(result, idx, query))
    .forEach((element) => ul.appendChild(element));

  newSuggestions.appendChild(ul);

  newSuggestions.addEventListener('click', (e) => {
    if (e.target.matches('.Suggestion ul li'))
      events.selectItem(e.target.dataset.index);
    events.alertItem(e.target.dataset.index);
  });

  return newSuggestions;
};
