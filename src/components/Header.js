import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  total = () => {
    const { expenses } = this.props;
    let total = 0;
    if (expenses) {
      expenses.forEach((elemento) => {
        const valorMoeda = elemento.exchangeRates[elemento.currency].ask;
        const totalDaConta = (Number(elemento.value)) * (Number(valorMoeda));
        total += totalDaConta;
      });
      return total.toFixed(2);
    }
  };

  render() {
    const { email, currency } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email}
        </p>
        <div data-testid="total-field">
          { this.total() }
        </div>
        <p data-testid="header-currency-field">
          { currency }
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  value: state.wallet.value,
  expenses: state.wallet.expenses,
  currency: state.wallet.currency,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,

};

export default connect(mapStateToProps)(Header);
