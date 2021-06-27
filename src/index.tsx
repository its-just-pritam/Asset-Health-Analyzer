import Routes from './routes'
import { authConfig } from './UserManagerConfig'
import '@scuf/datatable/honeywell-compact-combined/theme.css'
import '@scuf/common/honeywell-compact-combined/theme.css'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthRoutes from './routes';
import { UserManager } from '@forge/sso-client/dist';
UserManager.createInstance(authConfig)
ReactDOM.render(<Routes />, document.querySelector('#root') as HTMLElement)

