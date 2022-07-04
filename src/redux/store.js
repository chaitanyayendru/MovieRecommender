import { applyMiddleware } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";

import mainReducer from "./mainReducer";
import mainSaga from "./mainSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: middlewares
});

sagaMiddleware.run(mainSaga);

export const persistor = persistStore(store);
