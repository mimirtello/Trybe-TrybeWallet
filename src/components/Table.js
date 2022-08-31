import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRegister, editRegister } from '../redux/actions/index';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
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

              <tr key={ elemento.id + 1 }>
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
                <td>
                  <button
                    data-testid="delete-btn"
                    type="submit"
                    onClick={ () => dispatch(deleteRegister(elemento)) }
                  >
                    Deletar
                  </button>

                  <button
                    data-testid="edit-btn"
                    type="submit"
                    onClick={ () => dispatch(editRegister(elemento.id)) }
                  >
                    Editar despesa
                  </button>
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
  // idToEdit: state.wallet,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
  // idToEdit: PropTypes.shape(PropTypes.object.isRequired).isRequired,

};
export default connect(mapStateToProps)(Table);
