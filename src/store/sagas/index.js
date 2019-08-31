import { takeLatest, put } from 'redux-saga/effects';

function* getEscolaDados() {
  try {
    let response = yield fetch('http://api/escola');
    yield response.json().then(resp => (response = resp));
    yield put({
      type: 'SUCCESS_ESCOLA_DADOS',
      payload: { data: response }
    });
  } catch (err) {
    yield put({ type: 'FAILURE_ESCOLA_DADOS' });
  }
}

export default function* root() {
  yield takeLatest('REQUEST_ESCOLA_DADOS', getEscolaDados);
}
