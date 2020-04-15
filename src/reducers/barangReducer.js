import { LIST_BARANG, HAPUS_LIST_BARANG } from '../actions/types';

const LIST_BARANG_STORAGE = 'list-barang';

const getLocalStorageBarang = () => {
    const storageBarang = localStorage.getItem(LIST_BARANG_STORAGE);
    if (!storageBarang) return [];
    return JSON.parse(storageBarang);
};

const saveToLocalStorageBarang = (items) => {
    localStorage.setItem(LIST_BARANG_STORAGE, JSON.stringify(items));
};

const initialState = getLocalStorageBarang();

export default (state = initialState, action) => {
    switch (action.type) {
      case LIST_BARANG:
        const newArr = [...state];
        newArr.push(action.payload);
        saveToLocalStorageBarang(newArr);
        return newArr;
      case HAPUS_LIST_BARANG:
        const newList = state;
        const cariIndex = newList.findIndex(e => e.id === action.payload.id);
        if (cariIndex > -1) {
          newList.splice(cariIndex, 1)
        };
        saveToLocalStorageBarang(newList);
        return newList;
      default:
        return state
    };
};