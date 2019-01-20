import itemsReducer from "./itemsReducer";
import itemReducer from "./itemReducer";
import { reducer as formReducer } from 'redux-form';

const allReducers = {
    items: itemsReducer,
    item: itemReducer,
    form: formReducer
}

export default allReducers;