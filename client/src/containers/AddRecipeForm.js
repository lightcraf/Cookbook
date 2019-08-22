import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRecipe } from '../actions';

class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.recipeNameAdd = React.createRef();
    this.recipeDescriptionAdd = React.createRef();
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
    let recipeName = this.recipeNameAdd.current;
    let recipeDescription = this.recipeDescriptionAdd.current;

    if (recipeName.value === "" || recipeDescription.value === "") {
      return;
    }

    this.props.addRecipe(recipeName.value, recipeDescription.value);

    recipeName.value = "";
    recipeDescription.value = "";
  }

  render() {
    return (
      <div className="form-wrapper">
        <h3 className="form-title">Add recipe</h3>
        <form onSubmit={(e) => this.handleAddRecipe(e)}>
          <label className="form-label" htmlFor="add-recipe">Recipe:</label>
          <input
            type="text"
            id="add-recipe"
            className="form-control"
            name="recipe-name-add"
            ref={this.recipeNameAdd}
            onChange={(e) => this.handleFormChange(e)} />
          <label className="form-label" htmlFor="add-recipe-description">Description:</label>
          <textarea
            id="add-recipe-description"
            className="form-control"
            name="recipe-description-add"
            ref={this.recipeDescriptionAdd}
            onChange={(e) => this.handleFormChange(e)}>
          </textarea>
          <button type="submit" className="form-btn-submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
    addRecipe
};

AddRecipeForm.propTypes = {
  addRecipe: PropTypes.func
};

export default connect(null, mapDispatchToProps)(AddRecipeForm);
