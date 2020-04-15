import { LIST_BELANJA, HAPUS_LIST_BELANJA } from '../actions/types';

const LIST_BELANJA_STORAGE = 'list-belanja';

const getLocalStorageBelanja = () => {
    const storageBelanja = localStorage.getItem(LIST_BELANJA_STORAGE);
    if (!storageBelanja) return [];
    return JSON.parse(storageBelanja);
};

const saveToLocalStorageBelanja = (items) => {
    localStorage.setItem(LIST_BELANJA_STORAGE, JSON.stringify(items));
};

const initialState = getLocalStorageBelanja();

export default (state = initialState, action) => {
    switch (action.type) {
      case LIST_BELANJA:
        const newArr = [...state];
        newArr.push(action.payload);
        saveToLocalStorageBelanja(newArr)
        return newArr;
      case HAPUS_LIST_BELANJA:
        const newList = state;
        const cariIndex = newList.findIndex(e => e.id === action.payload.id);
        if (cariIndex > -1) {
          newList.splice(cariIndex, 1);
        };
        saveToLocalStorageBelanja(newList);
        return newList;
      default:
        return state
    };
};