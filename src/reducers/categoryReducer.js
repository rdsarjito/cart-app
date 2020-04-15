import { LIST_CATEGORY } from '../actions/types';

import { LIST_CATEGORY_STORAGE, getLocalStorage, saveToLocalStorage } from '../helper/localStorage';

const initialState = getLocalStorage(LIST_CATEGORY_STORAGE);

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_CATEGORY:
      const newArr = [...state];
      newArr.push(action.payload);
      saveToLocalStorage(LIST_CATEGORY_STORAGE, newArr);
      return newArr;
    default:
      return state
  };
};