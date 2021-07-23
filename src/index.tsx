import '@scuf/datatable/honeywell-compact-combined/theme.css'
import '@scuf/common/honeywell-compact-combined/theme.css'
import './index.css';
 
import { UserManager } from '@forge/sso-client/dist';
import React from 'react';
import ReactDOM from 'react-dom';
 
import Routes from './routes'
import { authConfig } from './UserManagerConfig'
 
UserManager.createInstance(authConfig)
 
ReactDOM.render(<Routes />, document.querySelector('#root') as HTMLElement)
