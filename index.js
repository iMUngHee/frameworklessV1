import appView from './view/app.js';
import selectedView from './view/selected.js';
import suggestionView from './view/suggestion.js';

import applyDiff from './applyDiff.js';

import registry from './registry.js';
import { search } from './api.js';

registry.add('app', appView);
registry.add('suggestion', suggestionView);
registry.add('selected', selectedView);

const state = {
  results: [],
  lists: [],
  query: '',
};

const events = {
  searchItem: async (query) => {
    if (!query) {
      state.results = [];
      state.query = '';
    } else {
      const res = await search(query);
      state.results = res.map((text, idx) => ({
        text,
        selected: idx === 0 ? true : false,
      }));
      state.query = query;
    }

    render();
  },

  moveItem: (direction) => {
    let target;
    const idx = state.results.findIndex((result) => result.selected);

    if (direction === 'ArrowDown')
      target = idx + 1 >= state.results.length ? 0 : idx + 1;
    else if (direction === 'ArrowUp')
      target = idx - 1 < 0 ? state.results.length - 1 : idx - 1;

    state.results[idx].selected = false;
    state.results[target].selected = true;

    render();
  },

  alertItem: (index = null) => {
    const idx = index ?? state.results.findIndex((result) => result.selected);

    window.alert(state.results[idx].text);
  },

  selectItem: (idx) => {
    const text = state.results[idx].text;

    state.lists = state.lists.filter((li) => li !== text);
    state.lists.push(text);
    if (state.lists.length > 5) state.lists = state.lists.slice(1);

    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');
    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

render();
