import { REQUEST_API, GET_MOEDA } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
  moeda: 'BRL',
  isLoading: false,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,

    };
  case GET_MOEDA:
    return {
      ...state,
      isLoading: false,
      currencies: action.data,
    };
  // case ADD_CADASTRO:
  //   return [...state, action.value];
  // case DELETE_CADASTRO:
  //   return state.filter((register) => register !== action.value);
  default:
    return state;
  }
}

export default wallet;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
