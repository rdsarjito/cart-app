import { LIST_CATEGORY, LIST_BARANG, LIST_BELANJA, HAPUS_LIST_BARANG, HAPUS_LIST_BELANJA } from './types';

export const tambahDataCategory = (id, namaCategory) => {
    return (dispatch) => {
        dispatch({
            type: LIST_CATEGORY,
            payload: {
                id: id,
                namaCategory: namaCategory
            }
        });
    };
};

export const tambahDataBarang = (id, namaBarang, harga, idCategory) => {
    return (dispatch) => {
        dispatch({
            type: LIST_BARANG,
            payload: {
                id,
                namaBarang,
                harga,
                idCategory,
            }
        });
    };
};

export const tambahDataBelanja = (id, count, totalHarga, idCategory, idBarang) => {
    return (dispatch) => {
        dispatch({
            type: LIST_BELANJA,
            payload: {
                id,
                count,
                totalHarga,
                idCategory,
                idBarang
            }
        });
    };
};

export const hapusDataBarang = (id) => {
    return (dispatch) => {
        dispatch({
            type: HAPUS_LIST_BARANG,
            payload: {
                id,
            }
        });
    };
};

export const hapusDataBelanja = (id) => {
    return (dispatch) => {
        dispatch({
            type: HAPUS_LIST_BELANJA,
            payload: {
                id,
            }
        });
    };
};