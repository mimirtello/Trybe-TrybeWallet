import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // state = {
  //   total: 0,
  //   moeda: 'BRL',
  // };

  render() {
    const { email, total, moeda } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email}
        </p>
        <p data-testid="total-field">
          { total }
        </p>
        <p data-testid="header-currency-field">
          { moeda }
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  moeda: state.wallet.moeda,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  moeda: PropTypes.string.isRequired,

};
// Iniciando Projeto
export default connect(mapStateToProps)(Header);
