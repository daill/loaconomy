import itemsReducer from "./itemsReducer";
import itemReducer from "./itemReducer";
import statsReducer from "./statsReducer";
import lastSeenPricesReducer from "./lastSeenPricesReducer";
import priceReducer from "./priceReducer";
import pricesReducer from "./pricesReducer";
import { reducer as formReducer } from 'redux-form';

const allReducers = {
    items: itemsReducer,
    item: itemReducer,
    stats: statsReducer,
    last_seen_prices: lastSeenPricesReducer,
    price: priceReducer,
    prices: pricesReducer,
    form: formReducer
}

export default allReducers;