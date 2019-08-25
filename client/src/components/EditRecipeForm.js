import React from 'react';
import PropTypes from 'prop-types';

class EditRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.recipeNameEdit = React.createRef();
  }

  render() {
    const {focus, recipeNameEdit, recipeDescriptionEdit, handleEditRecipe, handleFormChange} = this.props;

    if (focus === true) {
      this.recipeNameEdit.current.focus();
    }

    return (
      <div className="form-wrapper">
        <h3 className="form-title">Edit recipe</h3>
        <form onSubmit={(e) => handleEditRecipe(e)}>
          <label className="form-label" htmlFor="edit-recipe">Recipe:</label>
          <input
            type="text"
            id="edit-recipe"
            className="form-control"
            name="recipe-name-edit"
            ref={this.recipeNameEdit}
            value={recipeNameEdit}
            onChange={(e) => handleFormChange(e)} />
          <label className="form-label" htmlFor="edit-recipe-description">Description:</label>
          <textarea
            id="edit-recipe-description"
            className="form-control"
            name="recipe-description-edit"
            value={recipeDescriptionEdit}
            onChange={(e) => handleFormChange(e)}>
          </textarea>
          <button type="submit" className="form-btn-submit">Save</button>
        </form>
      </div>
    );
  }
}

EditRecipeForm.propTypes = {
  recipeNameEdit: PropTypes.string,
  recipeDescriptionEdit: PropTypes.string,
  focus: PropTypes.bool,
  handleFormChange: PropTypes.func,
  handleEditRecipe: PropTypes.func
};

export default EditRecipeForm;