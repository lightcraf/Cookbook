import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setRecipeNameEdit, setRecipeDescriptionEdit, setRecipeId, editRecipe, setFocus } from '../actions';
import EditRecipeForm from '../components/EditRecipeForm';

class EditRecipeFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleEditRecipe = this.handleEditRecipe.bind(this);
  }

  handleFormChange(e) {
    const inputValue = e.target.value;
    if (e.target.name === "recipe-name-edit") {
      this.props.setRecipeNameEdit(inputValue);
    } else if (e.target.name === "recipe-description-edit") {
      this.props.setRecipeDescriptionEdit(inputValue);
      this.props.setFocus(false);
    }
  }

  handleEditRecipe(e) {
    e.preventDefault();
    const recipeId = this.props.recipeId;
    const recipeName = this.props.recipeNameEdit;
    const recipeDescription = this.props.recipeDescriptionEdit;

    if (recipeName === "" || recipeDescription === "" || recipeId === "") {
      return;
    }

    this.props.editRecipe(recipeId, recipeName, recipeDescription);
    this.props.setRecipeId("");
    this.props.setRecipeNameEdit("");
    this.props.setRecipeDescriptionEdit("");
  }

  render() {
    return (
      <EditRecipeForm
        handleFormChange={this.handleFormChange}
        handleEditRecipe={this.handleEditRecipe}
        recipeNameEdit={this.props.recipeNameEdit}
        recipeDescriptionEdit={this.props.recipeDescriptionEdit}
        focus={this.props.focus} />
    );
  }
}

const mapStateToProps = state => {
  return {
    recipeNameEdit: state.setRecipeNameEdit,
    recipeDescriptionEdit: state.setRecipeDescriptionEdit,
    recipeId: state.setRecipeId,
    focus: state.setFocus
  };
};

const mapDispatchToProps = {
    setRecipeNameEdit,
    setRecipeDescriptionEdit,
    setRecipeId,
    editRecipe,
    setFocus
};

EditRecipeFormContainer.propTypes = {
  recipeNameEdit: PropTypes.string,
  recipeDescriptionEdit: PropTypes.string,
  recipeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  focus: PropTypes.bool,
  setFocus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipeFormContainer);