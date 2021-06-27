import { AuthProvider } from '@forge/sso-client'

import { Loader } from '@scuf/common'

import { Provider } from 'mobx-react'

import React, { FC } from 'react'

import { BrowserRouter as Router, Switch } from 'react-router-dom'



import App from '../App'

import { CallbackRoute, LoginRoute, LogoutRoute, PrivateRoute } from '../components/CustomRoutes'

import store from '../Store'



const wrappedApp = (

<Provider {...store}>

<App />

</Provider>

)



export const Routes: FC<any> = () => {

return (

<AuthProvider loadingComponent={Loader}>

<Router>

<Switch>

<CallbackRoute path='/callback' />

<LoginRoute path='/login' />

<LogoutRoute path='/logout' />

<PrivateRoute path='/'>{wrappedApp}</PrivateRoute>

</Switch>

</Router>

</AuthProvider>

)

}

export default Routes