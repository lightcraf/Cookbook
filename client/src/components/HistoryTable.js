import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HistoryTable extends Component {
  render() {
    return (
      <table className="history-table">
        <thead>
          <tr className="history-table-row">
            <th className="history-table-header">Edited</th>
            <th className="history-table-header">Recipe</th>
            <th className="history-table-header">Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.items.map((item, index) =>
            <tr className="history-table-row" key={index}>
              <td className="history-table-cell">{item.edited}</td>
              <td className="history-table-cell">{item.recipe}</td>
              <td className="history-table-cell">{item.description}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

HistoryTable.propTypes = {
  items: PropTypes.array
};

export default HistoryTable;