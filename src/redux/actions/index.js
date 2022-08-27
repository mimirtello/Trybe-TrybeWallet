export const ADD_CADASTRO = 'ADD_CADASTRO';
export const DELETE_CADASTRO = 'DELETE_CADASTRO';
export const LOGIN = 'LOGIN';

export const addRegister = (value) => ({ type: ADD_CADASTRO, value });
export const deleteRegister = (value) => ({ type: DELETE_CADASTRO, value });
export const login = (value) => ({ type: LOGIN, value });

// Coloque aqui suas actions
