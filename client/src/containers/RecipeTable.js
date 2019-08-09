import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HistoryTable from '../components/HistoryTable';
import {
  setRecipeNameEdit,
  setRecipeDescriptionEdit,
  setRecipeId,
  setHistoryVisibility,
  setFocus,
  getRecipes,
  getRecipeHistory
} from '../actions';

class RecipeTable extends React.Component {
  componentDidMount() {
    this.props.getRecipes();
  }

  handleGetRowData(item) {
    this.props.setRecipeId(item.id);
    this.props.setRecipeNameEdit(item.recipe);
    this.props.setRecipeDescriptionEdit(item.description);
    this.props.setFocus(true);
  }

  handleRecipeHistory(item) {
    const recipeId = item.id;

    this.props.setRecipeId(recipeId);
    this.props.getRecipeHistory(recipeId);

    if (this.props.isHistoryVisible === false) {
      this.props.setHistoryVisibility(true);
    } else {
      this.props.setHistoryVisibility(false);
    }
  }

  render() {
    const historyRecipeId = this.props.recipeId;
    const isHistoryVisible = this.props.isHistoryVisible;
    let historyTable = null;

    if (this.props.recipeHistory.length !== 0) {
      historyTable = <HistoryTable items={this.props.recipeHistory} />;
    } else {
      historyTable = "No history to show";
    }

    if (this.props.recipesHasErrored) {
      return <p>Sorry! There was an error loading the recipes.</p>;
    }

    if (this.props.recipesIsLoading) {
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
          {this.props.recipes.map(item =>
            <React.Fragment key={item.id}>
              <tr className="recipe-table-row">
                <td className="recipe-table-cell">{item.created}</td>
                <td className="recipe-table-cell">{item.recipe}</td>
                <td className="recipe-table-cell">{item.description}</td>
                <td className="recipe-table-cell">
                  <button className="table-btn btn-edit" onClick={() => this.handleGetRowData(item)}>Edit</button>
                  <button className="table-btn btn-history" onClick={() => this.handleRecipeHistory(item)}>
                    {(isHistoryVisible && (historyRecipeId === item.id)) ? "Hide history" : "View history"}
                  </button>
                </td>
              </tr>
              {(isHistoryVisible && (historyRecipeId === item.id)) ?
                <tr className="recipe-table-row"><td className="history-table-wrapper" colSpan="4">{historyTable}</td></tr> : null}
            </React.Fragment>
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    recipesHasErrored: state.recipesHasErrored,
    recipesIsLoading: state.recipesIsLoading,
    recipeId: state.setRecipeId,
    recipeNameEdit: state.setRecipeNameEdit,
    recipeDescriptionEdit: state.setRecipeDescriptionEdit,
    recipeHistory: state.recipeHistory,
    isHistoryVisible: state.setHistoryVisibility
  };
};

const mapDispatchToProps = {
    setRecipeId,
    setRecipeNameEdit,
    setRecipeDescriptionEdit,
    setHistoryVisibility,
    setFocus,
    getRecipes,
    getRecipeHistory
};

RecipeTable.propTypes = {
  recipes: PropTypes.array,
  recipesHasErrored: PropTypes.bool,
  recipesIsLoading: PropTypes.bool,
  recipeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  recipeNameEdit: PropTypes.string,
  recipeDescriptionEdit: PropTypes.string,
  recipeHistory: PropTypes.array,
  isHistoryVisible: PropTypes.bool,
  getRecipes: PropTypes.func,
  setRecipeId: PropTypes.func,
  setRecipeNameEdit: PropTypes.func,
  setRecipeDescriptionEdit: PropTypes.func,
  getRecipeHistory: PropTypes.func,
  setHistoryVisibility: PropTypes.func,
  setFocus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeTable);
