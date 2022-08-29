import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, addRegister } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  AdicionarDespesas = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(addRegister({ value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data }));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="value-input"
          onChange={ this.handleChange }
          name="value"
          value={ value }
        />
        <input
          type="text"
          data-testid="description-input"
          onChange={ this.handleChange }
          name="description"
          value={ description }
        />
        <select
          data-testid="currency-input"
          onChange={ this.handleChange }
          name="currency"
        >
          {currencies.map((elemento) => (
            <option
              key={ elemento }
              value={ elemento }
            >
              { elemento }

            </option>
          ))}

        </select>

        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
        >

          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button
          type="submit"
          onClick={ this.AdicionarDespesas }
        >
          Adicionar Despesas
        </button>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
