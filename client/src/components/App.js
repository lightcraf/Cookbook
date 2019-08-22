import React, { Component } from 'react';
import EditRecipeForm from '../containers/EditRecipeForm';
import AddRecipeForm from '../containers/AddRecipeForm';
import RecipeTable from '../containers/RecipeTable';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-6">
            <AddRecipeForm />
          </div>
          <div className="col-6">
            <EditRecipeForm />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <RecipeTable />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
