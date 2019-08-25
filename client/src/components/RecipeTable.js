import React from 'react';
import PropTypes from 'prop-types';
import HistoryTable from '../components/HistoryTable';

class RecipeTable extends React.Component {
  render() {
    const {recipeId, isHistoryVisible, recipeHistory, recipesHasErrored, recipesIsLoading, recipes, handleGetRowData, handleRecipeHistory} = this.props;
    let historyTable = null;

    if (recipeHistory.length !== 0) {
      historyTable = <HistoryTable items={recipeHistory} />;
    } else {
      historyTable = "No history to show";
    }

    if (recipesHasErrored) {
      return <p>Sorry! There was an error loading the recipes.</p>;
    }

    if (recipesIsLoading) {
      return <p>Loading…</p>;
    }

    return (
      <table className="recipe-table">
        <thead>
          <tr className="recipe-table-row">
            <th className="recipe-table-header">Created</th>
            <th className="recipe-table-header">Recipe</th>
            <th className="recipe-table-header">Description</th>
            <th className="recipe-table-header"></th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(item =>
            <React.Fragment key={item.id}>
              <tr className="recipe-table-row">
                <td className="recipe-table-cell">{item.created}</td>
                <td className="recipe-table-cell">{item.recipe}</td>
                <td className="recipe-table-cell">{item.description}</td>
                <td className="recipe-table-cell">
                  <button className="table-btn btn-edit" onClick={() => handleGetRowData(item)}>Edit</button>
                  <button className="table-btn btn-history" onClick={() => handleRecipeHistory(item)}>
                    {(isHistoryVisible && (recipeId === item.id)) ? "Hide history" : "View history"}
                  </button>
                </td>
              </tr>
              {(isHistoryVisible && (recipeId === item.id)) ?
                <tr className="recipe-table-row"><td className="history-table-wrapper" colSpan="4">{historyTable}</td></tr> : null}
            </React.Fragment>
          )}
        </tbody>
      </table>
    );
  }
}

RecipeTable.propTypes = {
  recipes: PropTypes.array,
  recipesHasErrored: PropTypes.bool,
  recipesIsLoading: PropTypes.bool,
  recipeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  recipeHistory: PropTypes.array,
  isHistoryVisible: PropTypes.bool,
  handleGetRowData: PropTypes.func,
  handleRecipeHistor: PropTypes.func,
};

export default RecipeTable;