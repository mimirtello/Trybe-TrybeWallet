import React from 'react';
import { screen /* render */ } from '@testing-library/react';
import App from '../App';
import renderWith from './helpers/renderWith';

describe('Login', () => {
  test('verifica se a tela inicial é renderizada corretamente', () => {
    renderWith(<App />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
});
