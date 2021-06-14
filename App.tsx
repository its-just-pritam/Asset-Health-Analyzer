import React from 'react';
import './App.css';
import Dashboard from './pages/newDashboard';
import AddVariables from './pages/AddVariables';
import Home from './pages/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/add-variables" component={AddVariables} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
