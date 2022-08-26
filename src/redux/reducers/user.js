import { LOGIN } from '../actions';

const initialState = {
  email: '',
  password: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return action.value;
  default:
    return state;
  }
}

export default user;

// Esse reducer será responsável por tratar as informações da pessoa usuária
