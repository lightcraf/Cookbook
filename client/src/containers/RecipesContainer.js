import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeTable from '../components/RecipeTable';
import {
  setRecipeNameEdit,
  setRecipeDescriptionEdit,
  setRecipeId,
  setHistoryVisibility,
  setFocus,
  getRecipes,
  getRecipeHistory
} from '../actions';

class RecipesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRecipeHistory = this.handleRecipeHistory.bind(this);
    this.handleGetRowData = this.handleGetRowData.bind(this);
  }

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
    return (
      <RecipeTable 
        recipes={this.props.recipes} 
        recipeId={this.props.recipeId} 
        isHistoryVisible={this.props.isHistoryVisible} 
        recipeHistory={this.props.recipeHistory} 
        recipesHasErrored={this.props.recipesHasErrored} 
        recipesIsLoading={this.props.recipesIsLoading} 
        handleRecipeHistory={this.handleRecipeHistory}
        handleGetRowData={this.handleGetRowData} />
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

RecipesContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer);