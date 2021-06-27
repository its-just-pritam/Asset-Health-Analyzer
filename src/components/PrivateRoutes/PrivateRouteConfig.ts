import Home from "../../pages/Home"
import Dashboard from "../../pages/Dashboard"
import UpdateVariables from "../../pages/UpdateVariables"
import SelectAssets from "../../pages/SelectAssets"

export const getPrivateRoutesList = () => {
    return[
        {
            name:"Home",
            path:"/Home",
            component:Home,
            icon:"home",
            position: "sidebar"
        },
        {
            name:"Dashboard",
            path:"/Dashboard",
            component:Dashboard,
            icon:"grid",
            position: "sidebar"
        },
        {
            name:"Select Assets",
            path:"/select-assets",
            component:SelectAssets,
            icon:"",
            position: "dashboard"
        },
        {
            name:"Add Events",
            path:"/add-events",
            component:UpdateVariables,
            icon:"",
            position: "dashboard"
        },
        {
            name:"Show Faults",
            path:"/show-faults",
            component:UpdateVariables,
            icon:"",
            position: "dashboard"
        },
        {
            name:"Update Variables",
            path:"/update-variables",
            component:UpdateVariables,
            icon:"",
            position: "dashboard"
        },
        {
            name:"Add Rules",
            path:"/add-rules",
            component:UpdateVariables,
            icon:"",
            position: "dashboard"
        }
    ]
}