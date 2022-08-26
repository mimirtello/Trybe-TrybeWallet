import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      isDisabled: true,

    };
  }

  InputChangeEmail = (event) => {
    this.setState({ email: event.target.value });
    this.validacao();
  };

  validacao = () => {
    const { password, email } = this.state;
    const seis = 6;
    const emailValido = (/\S+@\S+\.\S+/).test(email);
    if (emailValido === false) {
      this.setState({ isDisabled: true });
    } else if (password.length < seis) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  };

  inputChangeSenha = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validacao();
    });
  };

  entrar = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;

    dispatch(login({ email, password }));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, password, email } = this.state;
    return (
      <div>
        <div>Login</div>

        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.InputChangeEmail }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.inputChangeSenha }
        />
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.entrar }
        >
          Entrar

        </button>

      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
