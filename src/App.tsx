import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import AddVariables from './pages/AddVariables';
import RemoveVariables from './pages/RemoveVariables';
import SelectAssets from './pages/SelectAssets';
import AuthRoutes from './routes';
import Home from './pages/Home';
// import AuthRoutes from './routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// axios.request({
//   url: "/oauth/token",
//   method: "post",
//   baseURL: "https://api.lyft.com/",
//   auth: {
//     username: "vaf7vX0LpsL5",
//     password: "pVEosNa5TuK2x7UBG_ZlONonDsgJc3L1"
//   },
//   data: {
//     "grant_type": "authorization_code",
//     "scope": "public"    
//   }
// }).then(function(res: any) {
//   console.log(res);  
// });


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/logout" component={AuthRoutes} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/select-assets" component={SelectAssets} />
        <Route path="/add-variables" component={AddVariables} />
        <Route path="/remove-variables" component={RemoveVariables} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
