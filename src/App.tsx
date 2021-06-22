import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import AddVariables from './pages/AddVariables';
import RemoveVariables from './pages/RemoveVariables';
import SelectAssets from './pages/SelectAssets';
import AuthRoutes from './routes';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/logout" component={AuthRoutes} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/select-assets" component={SelectAssets} />
        <Route path="/add-variables" component={AddVariables} />
        <Route path="/remove-variables" component={RemoveVariables} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
