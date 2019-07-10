import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  setRecipeNameEdit, setRecipeDescriptionEdit, setRecipeId, editRecipe, setFocus } from '../actions';

class EditRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.recipeNameEdit = React.createRef();

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleEditRecipe = this.handleEditRecipe.bind(this);
  }

  handleFormChange(event) {
    const inputValue = event.target.value;
    if (event.target.name === "recipe-name-edit") {
      this.props.setRecipeNameEdit(inputValue);
    } else if (event.target.name === "recipe-description-edit") {
      this.props.setRecipeDescriptionEdit(inputValue);
      this.props.setFocus(false);
    }
  }

  handleEditRecipe(event) {
    event.preventDefault();
    const recipeId = this.props.recipeId;
    const recipeName = this.props.recipeNameEdit;
    const recipeDescription = this.props.recipeDescriptionEdit;

    if (recipeName === "" || recipeDescription === "" || recipeId === "") {
      return;
    }

    this.props.editRecipe('/api/edit', recipeId, recipeName, recipeDescription);
    this.props.setRecipeId("");
    this.props.setRecipeNameEdit("");
    this.props.setRecipeDescriptionEdit("");
  }

  render() {
    if (this.props.focus === true) {
      this.recipeNameEdit.current.focus();
    }

    return (
      <div className="form-wrapper">
        <h3 className="form-title">Edit recipe</h3>
        <form onSubmit={this.handleEditRecipe}>
          <label className="form-label" htmlFor="edit-recipe">Recipe:</label>
          <input
            type="text"
            id="edit-recipe"
            className="form-control"
            name="recipe-name-edit"
            ref={this.recipeNameEdit}
            value={this.props.recipeNameEdit}
            onChange={this.handleFormChange} />
          <label className="form-label" htmlFor="edit-recipe-description">Description:</label>
          <textarea
            id="edit-recipe-description"
            className="form-control"
            name="recipe-description-edit"
            value={this.props.recipeDescriptionEdit}
            onChange={this.handleFormChange}>
          </textarea>
          <button type="submit" className="form-btn-submit">Save</button>
        </form>
      </div>
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

const mapDispatchToProps = dispatch => {
  return {
    setRecipeNameEdit: recipeName => dispatch(setRecipeNameEdit(recipeName)),
    setRecipeDescriptionEdit: recipeDescription => dispatch(setRecipeDescriptionEdit(recipeDescription)),
    setRecipeId: recipeId => dispatch(setRecipeId(recipeId)),
    editRecipe: (url, recipeId, recipeName, recipeDescription) => dispatch(editRecipe(url, recipeId, recipeName, recipeDescription)),
    setFocus: bool => dispatch(setFocus(bool))
  };
};

EditRecipeForm.propTypes = {
  recipeNameEdit: PropTypes.string,
  recipeDescriptionEdit: PropTypes.string,
  recipeId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  focus: PropTypes.bool,
  setFocus: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipeForm);
