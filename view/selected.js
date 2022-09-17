let template;

const createNewSelectedNode = () => {
  if (!template) {
    template = document.getElementById('selected-item');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getSelectedElement = (text) => {
  const element = createNewSelectedNode();

  element.textContent = text;

  return element;
};

export default (targetElement, state, events) => {
  const { lists } = state;
  const newSelected = targetElement.cloneNode(true);
  const ul = document.createElement('ul');

  newSelected.innerHTML = '';
  lists
    .map((text) => getSelectedElement(text))
    .forEach((element) => ul.appendChild(element));

  newSelected.appendChild(ul);

  return newSelected;
};
