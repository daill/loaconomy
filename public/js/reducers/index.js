import itemsReducer from "./itemsReducer";
import itemReducer from "./itemReducer";
import statsReducer from "./statsReducer";
import { reducer as formReducer } from 'redux-form';

const allReducers = {
    items: itemsReducer,
    item: itemReducer,
    stats: statsReducer,
    form: formReducer
}

export default allReducers;