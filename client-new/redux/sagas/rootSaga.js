import layoutSaga from "./layoutSaga";
import { fork, all } from "redux-saga/effects";

function* rootSaga() {
    yield all([
        layoutSaga()
    ]);
}

export default rootSaga;