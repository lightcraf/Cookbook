import React, { Component } from 'react';
import EditRecipeFormContainer from '../containers/EditRecipeFormContainer';
import AddRecipeFormContainer from '../containers/AddRecipeFormContainer';
import RecipesContainer from '../containers/RecipesContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-6">
            <AddRecipeFormContainer />
          </div>
          <div className="col-6">
            <EditRecipeFormContainer />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <RecipesContainer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
