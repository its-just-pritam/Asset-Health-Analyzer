import { Loader } from '@scuf/common'
import { observer } from 'mobx-react'
import React, { FC, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
// import { NotFoundPage } from '../../pages/NotFound/NotFound'
import stores from '../../Store'
import { getPrivateRoutesList } from './PrivateRouteConfig'
const Routes: FC = observer(() => {
 const routes = getPrivateRoutesList()
 return (
 <Suspense fallback={<Loader />}>
 <Switch>
 {routes.map((route: { component: any; path: any }, index: any) => {
 const Component = route.component
 return (
 <Route exact key={`route-${index}`} path={route.path}>
 <Component />
 </Route>
 )
 })}
 <Route exact path='/' component={routes[0].component} />
 {/* <Route component={NotFoundPage} /> */}
 </Switch>
 </Suspense>
 )
})
const PrivateRoutes = React.memo(Routes)
export default PrivateRoutes
