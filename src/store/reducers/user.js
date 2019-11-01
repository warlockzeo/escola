const INITIAL_STATE = {
  data: {},
  loading: false,
  error: false
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'REQUEST_USER_DADOS':
      return { ...state, loading: true };
    case 'SUCCESS_USER_DADOS':
      return { data: action.payload.data, loading: false, error: false };
    case 'FAILURE_USER_DADOS':
      return { data: [], loading: false, error: true };
    default:
      return state;
  }
}
