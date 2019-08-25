import React from 'react';
import PropTypes from 'prop-types';

class AddRecipeForm extends React.Component {
  render() {
    const {handleFormChange, handleAddRecipe} = this.props;

    return (
      <div className="form-wrapper">
        <h3 className="form-title">Add recipe</h3>
        <form onSubmit={(e) => handleAddRecipe(e)}>
          <label className="form-label" htmlFor="add-recipe">Recipe:</label>
          <input
            type="text"
            id="add-recipe"
            className="form-control"
            name="recipe-name-add"
            onChange={(e) => handleFormChange(e)} />
          <label className="form-label" htmlFor="add-recipe-description">Description:</label>
          <textarea
            id="add-recipe-description"
            className="form-control"
            name="recipe-description-add"
            onChange={(e) => handleFormChange(e)}>
          </textarea>
          <button type="submit" className="form-btn-submit">Add</button>
        </form>
      </div>
    );
  }
}

AddRecipeForm.propTypes = {
  handleFormChange: PropTypes.func,
  handleAddRecipe: PropTypes.func
};

export default AddRecipeForm;