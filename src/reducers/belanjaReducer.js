import { LIST_BELANJA, HAPUS_LIST_BELANJA } from '../actions/types';
import { LIST_BELANJA_STORAGE, getLocalStorage, saveToLocalStorage } from '../helper/localStorage';

const initialState = getLocalStorage(LIST_BELANJA_STORAGE);

saveToLocalStorage('contoh', 'token');

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_BELANJA:
      const newArr = [...state];
      newArr.push(action.payload);
      saveToLocalStorage(LIST_BELANJA_STORAGE, newArr)
      return newArr;
    case HAPUS_LIST_BELANJA:
      const newList = [...state];
      const cariIndex = newList.findIndex(e => e.id === action.payload.id);
      if (cariIndex > -1) {
        newList.splice(cariIndex, 1);
      };
      saveToLocalStorage(LIST_BELANJA_STORAGE, newList);
      return newList;
    default:
      return state
  };
};