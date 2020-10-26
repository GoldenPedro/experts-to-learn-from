import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Signup from './Components/Signup'
import NewExpertForm from './Components/Expert/NewExpertForm'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/new-expert'>
          <NewExpertForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
