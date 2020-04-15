import { combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import barangReducer from './barangReducer';
import belanjaReducer from './belanjaReducer';

export default combineReducers({
    category: categoryReducer,
    barang: barangReducer,
    belanja: belanjaReducer
});