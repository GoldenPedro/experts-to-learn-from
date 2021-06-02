import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import PrivateRoute from './Components/Private/PrivateRoute'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Signup from './Components/Signup'
import NewExpertForm from './Components/Expert/NewExpertForm'
import CreateExpertForm from './Components/Expert/CreateExpertForm'
import Expert from './Components/Expert/Expert';
import About from './Components/About';
import NotFound from './Components/NotFound'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

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
        <Route exact path='/sign-up'>
          <Signup />
        </Route>
        <PrivateRoute exact path='/new-expert' component={CreateExpertForm} />
        <Route path='/api/getexpert/:id'>
          <Expert />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
