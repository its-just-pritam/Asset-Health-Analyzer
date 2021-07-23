import { SidebarLayout } from '@scuf/common'
import { observer } from 'mobx-react'
import React from 'react'
import { useHistory, useLocation } from 'react-router'

import stores from '../Store'
import { getPrivateRoutesList } from './PrivateRoutes/PrivateRouteConfig'

// The const allows for shortening names of view subcomponents
const Sidebar = SidebarLayout.Sidebar

export const AppSidebar: React.FC = observer((props) => {
const { globalStore } = stores

const { push } = useHistory()
const { pathname } = useLocation()
const pages = getPrivateRoutesList()

return (
<SidebarLayout collapsed={globalStore.sideBarCollapsed} className='app-sidebar'>
<Sidebar>
    {pages.map((page: { path: string; name: string; icon: string; position: string;}, key: any) => {
        if( page.position === "sidebar" ) {
            const path: string = page.path
            const isActive = pathname.includes(path)
            return (
                <Sidebar.Item
                    key={`sidebar-item-${key}`}
                    content={page.name}
                    onClick={() => push(path)}
                    active={isActive}
                    icon={page.icon}
                />
            )
        }
        else {
            return (<></>)
        }
    })}
</Sidebar>
<SidebarLayout.Content>{props.children}</SidebarLayout.Content>
</SidebarLayout>
)
})

export default AppSidebar