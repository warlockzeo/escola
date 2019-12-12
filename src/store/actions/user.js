function requestLogin() {
  return {
    type: 'REQUEST_LOGIN',
    payload: {}
  };
}

function receiveLogin(json) {
  /*
  Nivel 500 - Desenvolvedor
  Nivel 100 - Admin
  Nivel 90 - Professor
  Nivel 10 - Aluno
  */
  if (json.resp !== 'erro') {
    const { nivel, user, nome, id } = json.resp;
    if (nivel >= 90) {
      localStorage.setItem('userAccessLevel', nivel);
      localStorage.setItem('user', nome || user);
      localStorage.setItem('userId', id);
      window.location.href = '/dashboard/';
    } else {
      localStorage.setItem('userAccessLevel', nivel);
      localStorage.setItem('user', nome || user);
      localStorage.setItem('userId', id);
      window.location.href = '/aluno/';
    }
  }
  return {
    type: 'SUCCESS_LOGIN',
    payload: { data: json }
  };
}

function fetchLogin(data) {
  return dispatch => {
    dispatch(requestLogin());
    return fetch(`${process.env.REACT_APP_URLBASEAPI}verificarSenha`, {
      method: 'POST',
      body: JSON.stringify({
        user: data.user,
        senha: data.senha
      })
    })
      .then(response => response.json())
      .then(json => {
        return dispatch(receiveLogin(json));
      })
      .catch (() => { 'FAILURE_LOGIN'; });
  };
}

export const setLogin = (data) => {
  return fetchLogin(data);
};

function requestLogout() {
  return {
    type: 'REQUEST_LOGOUT',
    payload: {}
  };
}

function receiveLogout(json) {
  return {
    type: 'SUCCESS_LOGOUT',
    payload: { data: {} }
  };
}

function fetchLogout() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userAccessLevel');
    window.location.href = '/';
    return dispatch(receiveLogout());
  };
}

export const setLogout = () => {
  return fetchLogout();
};
