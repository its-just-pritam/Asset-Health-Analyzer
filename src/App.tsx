import React, { Component, Fragment } from 'react'
import AppFooter from './components/Footer'
import AppHeader from './components/Header'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'
import AppSidebar from './components/SideBar'
import './App.css';
import { observer } from 'mobx-react'
 
@observer
export class App extends Component {
  render() {
    return (
      <Fragment>
        <AppHeader />
        <AppSidebar>
          <PrivateRoutes />
        </AppSidebar>
        <AppFooter />
      </Fragment>
    )
  }
}
 
export default App;