import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setRecipeNameEdit, setRecipeDescriptionEdit, setRecipeId, editRecipe, setFocus } from '../actions';

class EditRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.recipeNameEdit = React.createRef();
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
    if (this.props.focus === true) {
      this.recipeNameEdit.current.focus();
    }

    return (
      <div className="form-wrapper">
        <h3 className="form-title">Edit recipe</h3>
        <form onSubmit={(e) => this.handleEditRecipe(e)}>
          <label className="form-label" htmlFor="edit-recipe">Recipe:</label>
          <input
            type="text"
            id="edit-recipe"
            className="form-control"
            name="recipe-name-edit"
            ref={this.recipeNameEdit}
            value={this.props.recipeNameEdit}
            onChange={(e) => this.handleFormChange(e)} />
          <label className="form-label" htmlFor="edit-recipe-description">Description:</label>
          <textarea
            id="edit-recipe-description"
            className="form-control"
            name="recipe-description-edit"
            value={this.props.recipeDescriptionEdit}
            onChange={(e) => this.handleFormChange(e)}>
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

const mapDispatchToProps = {
    setRecipeNameEdit,
    setRecipeDescriptionEdit,
    setRecipeId,
    editRecipe,
    setFocus
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
