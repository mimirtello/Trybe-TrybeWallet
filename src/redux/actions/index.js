export const ADD_CADASTRO = 'ADD_CADASTRO';
export const DELETE_CADASTRO = 'DELETE_CADASTRO';
export const EDIT_CADASTRO = 'EDIT_CADASTRO';
export const REQUEST_API = 'REQUEST_API';
export const GET_MOEDA = 'GET_MOEDA';
export const LOGIN = 'LOGIN';
export const SALVA_EDIT = 'SALVA_EDIT';

export const editRegister = (id) => ({
  type: EDIT_CADASTRO, id });
export const salvaEdit = (expenses) => ({ type: SALVA_EDIT, expenses });
export const addRegister = (expenses) => ({ type: ADD_CADASTRO, expenses });
export const deleteRegister = (value) => ({ type: DELETE_CADASTRO, value });
export const requestAPI = () => ({ type: REQUEST_API });
export const getMoeda = (data) => ({ type: GET_MOEDA, data });

export const login = (value) => ({ type: LOGIN, value });

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      dispatch(getMoeda(Object.keys(data)));
    } catch (error) {
      console.error(error);
    }
  };
}

// Coloque aqui suas actions
