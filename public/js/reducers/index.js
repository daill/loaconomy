import itemsReducer from "./itemsReducer";
import { reducer as formReducer } from 'redux-form';

const allReducers = {
    items: itemsReducer,
    form: formReducer
}

export default allReducers;