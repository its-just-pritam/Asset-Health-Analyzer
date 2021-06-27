import { UserManager, useSSOClient } from '@forge/sso-client'
import { Checkbox, Header, ThemeType, toggleTheme } from '@scuf/common'
import UserProfile from '@scuf/common/dist/components/Header/UserProfile/UserProfile'
import { observer } from 'mobx-react'
import React from 'react'
import { useHistory } from 'react-router'
import stores from '../Store'
export const AppHeader = observer(() => {
 const { globalStore } = stores
 const { push } = useHistory()
 const userManager = UserManager.getInstance()
 if (globalStore.darkMode) toggleTheme(ThemeType.Dark)
 else toggleTheme(ThemeType.Light)
 const { user } = useSSOClient()
 return (
 <Header
 id='honeywell-header'
 isForge
 title='Asset Health Analyzer'
 responsive
 collapseAtBreakpoint='m'
 onMenuToggle={() => globalStore.toggleSideBar(!globalStore.sideBarCollapsed)}
 onHeaderTransition={(data) => globalStore.toggleSideBar(data.collapsed)}
 onLogoClick={() => push('/')}
 onTitleClick={() => push('/')}
 >
 <UserProfile firstName={user?.profile.given_name || ''} lastName={user?.profile.family_name}>
 <UserProfile.Item>
 <Checkbox
 label={'Dark Mode'}
 checked={globalStore.darkMode}
 onChange={() => globalStore.toggleDarkMode(!globalStore.darkMode)}
 toggle={true}
 />
 </UserProfile.Item>
 <UserProfile.Item onClick={() => userManager.signoutRedirect()}>Logout</UserProfile.Item>
 </UserProfile>
 </Header>
 )
})
export default AppHeader
