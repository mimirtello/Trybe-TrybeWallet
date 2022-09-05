import React from 'react';
import { screen, waitFor/* render */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWith from './helpers/renderWith';
import mockData from './helpers/mockData';

const emailDigitado = 'teste@teste.com';
const senhaDigitada = '123456';
const initialState = {
  password: senhaDigitada,
  email: emailDigitado,
};
describe('Login', () => {
  test('verifica aparece o email no header ', () => {
    renderWith(<App />, initialState);

    userEvent.type(screen.getByTestId('email-input'), emailDigitado);
    userEvent.type(screen.getByTestId('password-input'), senhaDigitada);
    userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    const header = screen.getByTestId('email-field');
    expect(header).toHaveTextContent(emailDigitado);
  });
  test('verifica se a api foi chamada ', async () => {
    renderWith(<App />, initialState);
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockData) });

    userEvent.type(screen.getByTestId('email-input'), emailDigitado);
    userEvent.type(screen.getByTestId('password-input'), senhaDigitada);
    userEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    jest.clearAllMocks();
  });
  test('verifica os inputs', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockData) });
    const { history } = renderWith(<App />, initialState);
    history.push('/carteira');

    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();

    jest.clearAllMocks();
  });
  test('preenche os inputs e deleta um input', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(mockData) });
    const { history } = renderWith(<App />, initialState);
    history.push('/carteira');

    const value = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const moeda = screen.getByTestId('currency-input');
    const metodo = screen.getByTestId('method-input');
    const tipo = screen.getByTestId('tag-input');
    await waitFor(() => {
      expect(screen.getByText('USD')).toBeInTheDocument();
    });
    userEvent.type(value, '20');
    userEvent.type(descricao, 'teste');
    userEvent.selectOptions(moeda, 'USD');
    userEvent.selectOptions(metodo, 'Dinheiro');
    userEvent.selectOptions(tipo, 'Alimentação');
    userEvent.click(screen.getByRole('button', { name: /Adicionar despesa/i }));
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2);
    });
    // Deleta input
    const deletebtn = screen.getByRole('button', { name: /Deletar/i });
    expect(deletebtn).toBeInTheDocument();
    userEvent.click(deletebtn);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
