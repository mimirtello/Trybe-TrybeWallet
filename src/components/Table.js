import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table className="tabela">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((elemento) => (

              <tr key={ elemento.id }>
                <td>
                  {elemento.description}
                </td>
                <td>
                  {elemento.tag}
                </td>
                <td>
                  {elemento.method}
                </td>
                <td>
                  {Number(elemento.value).toFixed(2)}
                </td>
                <td>
                  {elemento.exchangeRates[elemento.currency].name}
                </td>
                <td>
                  {Number(elemento.exchangeRates[elemento.currency].ask).toFixed(2)}
                </td>
                <td>
                  { Number(elemento.value * elemento
                    .exchangeRates[elemento.currency].ask).toFixed(2) }
                </td>
                <td>
                  Real
                </td>

              </tr>

            )) }

          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,

};
export default connect(mapStateToProps)(Table);
