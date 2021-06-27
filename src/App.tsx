import React, { Component, Fragment } from 'react'



import AppFooter from './components/Footer'

import AppHeader from './components/Header'

import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'

import AppSidebar from './components/SideBar'
import './App.css';

function App() {

  if(JSON.parse(localStorage.getItem('assets')!).pointid === undefined)
    localStorage.setItem('assets', JSON.stringify({pointid: 0}));

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

export default App;
