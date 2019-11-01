import { takeLatest, put } from 'redux-saga/effects';

import urlBaseApi from '../../components/config';

function* getEscolaDados() {
  try {
    const response = yield fetch(`${urlBaseApi}api/escola`);
    const responseJson = yield response.json().then(resp => resp);
    yield put({
      type: 'SUCCESS_ESCOLA_DADOS',
      payload: { data: responseJson }
    });
  } catch (err) {
    yield put({ type: 'FAILURE_ESCOLA_DADOS' });
  }
}

export default function* root() {
  yield takeLatest('REQUEST_ESCOLA_DADOS', getEscolaDados);
}
