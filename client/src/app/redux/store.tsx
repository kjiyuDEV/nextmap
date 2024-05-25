import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'; // redux-saga를 생성하기 위한 라이브러리
import localStorage from 'redux-persist/es/storage';
import rootSaga from './sagas';
import { modalReducer } from './reducers/modal';

const authInfo = {
    key: 'authInfo',
    storage: localStorage,
};

const reducer = combineReducers({
    modals: modalReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// config 작성
const persistConfig = {
    key: 'auth', // 로컬스토리지에 저장할 키값
    storage, // local 또는 세션스토리지
    whitelist: ['auth'], // 저장할 리듀서
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // FLUSH: 저장된 모든 상태를 강제로 디스크에 쓰는 액션
                // REHYDRATE: 저장된 상태를 다시 로드하는 액션
                // PAUSE: 상태 저장을 일시 중지하는 액션
                // PERSIST: 상태저장을 시작하는 액션
                // PURGE: 저장된 상태를 모두 삭제하는 액션
                // REGISTER: 새로운 저장소를 등록하는 액션
                // *ignoredActions을 통하여 직렬화(데이터를 특정형식으로 변환하여 저장하거나 전송할 수 있게 만드는 과정)가능 여부 검사에서 제외시켜 불필요한 warning제거
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export const persister = persistStore(store);
