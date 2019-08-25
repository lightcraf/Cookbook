import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRecipe } from '../actions';
import AddRecipeForm from '../components/AddRecipeForm';

class AddRecipeFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
  }

  handleFormChange(e) {
    const inputValue = e.target.value;
    if (e.target.name === "recipe-name-edit") {
      this.props.setRecipeNameEdit(inputValue);
    } else if (e.target.name === "recipe-description-edit") {
      this.props.setRecipeDescriptionEdit(inputValue);
    }
  }

  handleAddRecipe(e) {
    e.preventDefault();
    const recipeName = e.target.elements["recipe-name-add"].value;
    const recipeDescription = e.target.elements["recipe-description-add"].value;
    
    if (recipeName === "" || recipeDescription === "") {
      return;
    }

    this.props.addRecipe(recipeName, recipeDescription);
    e.target.elements["recipe-name-add"].value = "";
    e.target.elements["recipe-description-add"].value = "";
  }

  render() {
    return (
      <AddRecipeForm handleFormChange={this.handleFormChange} handleAddRecipe={this.handleAddRecipe} />
    );
  }
}

const mapDispatchToProps = {
    addRecipe
};

AddRecipeFormContainer.propTypes = {
  addRecipe: PropTypes.func
};

export default connect(null, mapDispatchToProps)(AddRecipeFormContainer);