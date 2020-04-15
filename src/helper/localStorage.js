export const LIST_BARANG_STORAGE = 'list-barang';
export const LIST_BELANJA_STORAGE = 'list-belanja';
export const LIST_CATEGORY_STORAGE = 'list-category';

export const getLocalStorage = (param) => {
    const storage = localStorage.getItem(param);
    if (!storage) return [];
    return JSON.parse(storage);
};

export const saveToLocalStorage = (key, items) => {
    localStorage.setItem(key, JSON.stringify(items));
};
