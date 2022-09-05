import React from 'react';
import { screen /* render */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWith from './helpers/renderWith';

describe('Login', () => {
  test('verifica se a tela inicial é renderizada corretamente', () => {
    renderWith(<App />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  test('Entra no login', () => {
    const emailDigitado = 'teste@teste.com';
    const senhaDigitada = '123456';
    const initialState = {
      password: '123456',
      email: emailDigitado,
    };
    const { history } = renderWith(<App />, initialState);
    userEvent.type(screen.getByTestId('email-input'), emailDigitado);
    userEvent.type(screen.getByTestId('password-input'), senhaDigitada);
    history.push('/carteira');
  });
});
// testando o git
// teste
