function requestEscolaDados() {
  return {
    type: 'REQUEST_ESCOLA_DADOS',
    payload: {}
  };
}

function receiveEscolaDados(json) {
  return {
    type: 'SUCCESS_ESCOLA_DADOS',
    payload: { data: json }
  };
}

function fetchEscolaDados() {
  return dispatch => {
    dispatch(requestEscolaDados());
    return fetch(`${process.env.REACT_APP_URLBASEAPI}escola`)
      .then(response => response.json())
      .then(json => dispatch(receiveEscolaDados(json)))
      .catch (() => { 'FAILURE_ESCOLA_DADOS'; });
  };
}

export default function getEscolaDados() {
  return fetchEscolaDados();
}