import React, { Component } from 'react';
import EditReciprForm from '../containers/EditRecipeFrom';
import AddReciprForm from '../containers/AddRecipeFrom';
import RecipeTable from '../containers/RecipeTable';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-6">
            <AddReciprForm />
          </div>
          <div className="col-6">
            <EditReciprForm />
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