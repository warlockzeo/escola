
const INITIAL_STATE = {
  data: {
    isLogged: localStorage.getItem('user') ? true : false,
    nomeUsuarioLogado: localStorage.getItem('user') || '',
    idUsuarioLogado: localStorage.getItem('userId') || '',
    nivelAcessoUsuarioLogado: localStorage.getItem('userAccessLevel') || ''
  },
  loading: false,
  error: false
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_LOGIN':
    return { ...state, loading: true };
  case 'SUCCESS_LOGIN':
    return { data: action.payload.data, loading: false, error: false };
  case 'FAILURE_LOGIN':
    return { data: [], loading: false, error: true };
  case 'REQUEST_LOGOUT':
    return { ...state, loading: true };
  case 'SUCCESS_LOGOUT':
    return { data: action.payload.data, loading: false, error: false };
  case 'FAILURE_LOGOUT':
    return { data: [], loading: false, error: true };
  default:
    return state;
  }
}

export default user;