const INITIAL_STATE = {
  data: {},
  loading: false,
  error: false
};

export default function escola(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'REQUEST_ESCOLA_DADOS':
      return { ...state, loading: true };
    case 'SUCCESS_ESCOLA_DADOS':
      return { data: action.payload.data, loading: false, error: false };
    case 'FAILURE_ESCOLA_DADOS':
      return { data: [], loading: false, error: true };
    default:
      return state;
  }
}
