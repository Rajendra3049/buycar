import {
  legacy_createStore,
  compose,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import dealerReducer from "./dealer/dealer.reducer";
import inventoryReducer from "./inventory/inventory.reducer";

const rootReducer = combineReducers({
  dealerManager: dealerReducer,
  inventoryManager: inventoryReducer,
});

const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  comp(applyMiddleware(thunk))
);
