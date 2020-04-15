import { LIST_BARANG, HAPUS_LIST_BARANG } from '../actions/types';

import { LIST_BARANG_STORAGE, getLocalStorage, saveToLocalStorage } from '../helper/localStorage';

const initialState = getLocalStorage(LIST_BARANG_STORAGE);

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_BARANG:
      const newArr = [...state];
      newArr.push(action.payload);
      saveToLocalStorage(LIST_BARANG_STORAGE, newArr);
      return newArr;
    case HAPUS_LIST_BARANG:
      const newList = [...state];
      const cariIndex = newList.findIndex(e => e.id === action.payload.id);
      if (cariIndex > -1) {
        newList.splice(cariIndex, 1)
      };
      saveToLocalStorage(LIST_BARANG_STORAGE, newList);
      return newList;
    default:
      return state
  };
};