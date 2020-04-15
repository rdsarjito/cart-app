import { LIST_CATEGORY } from '../actions/types';

const LIST_CATEGORY_STORAGE = 'list-category';

const getLocalStorageCategory = () => {
  const storageCategory = localStorage.getItem(LIST_CATEGORY_STORAGE);
  if(!storageCategory) return[];
  return JSON.parse(storageCategory);
};


const saveToLocalStorageCategory = (items) => {
  localStorage.setItem(LIST_CATEGORY_STORAGE, JSON.stringify(items));
};

const initialState = getLocalStorageCategory();

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_CATEGORY:
      const newArr = [...state];
      newArr.push(action.payload);
      saveToLocalStorageCategory(newArr);
      return newArr;
    default:
      return state
  };
};