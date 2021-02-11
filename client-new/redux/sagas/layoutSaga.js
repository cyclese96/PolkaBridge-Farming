import { put, takeLatest } from 'redux-saga/effects';
import { CONNECT_WALLET, CONNECT_WALLET_SUCCESS } from "../actions/layoutAction";

function* FetchWalletData(action) {
    try {
        debugger
        const data = yield {
            address: "0x0d6ae2a429df13e44a07cd2969e085e4833f64a0"
        };
        yield put({ type: CONNECT_WALLET_SUCCESS, data });
    } catch (e) {
        
    }
}

function* layoutSaga() {
    yield takeLatest(CONNECT_WALLET, FetchWalletData);
}

export default layoutSaga