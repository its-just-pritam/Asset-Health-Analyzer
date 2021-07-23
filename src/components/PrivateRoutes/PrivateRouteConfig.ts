import Home from "../../pages/Home"
import Dashboard from "../../pages/Dashboard"
import UpdateVariables from "../../pages/UpdateVariables"
import SelectAssets from "../../pages/SelectAssets"
import ClientProfile from "../../pages/ClientProfile"
import AddRules from "../../pages/AddRules"

export const getPrivateRoutesList = () => {
    return[
        {
            name:"Home",
            path:"/Home",
            component:Home,
            icon:"home",
            position: "sidebar",
            details: ""
        },
        {
            name:"Dashboard",
            path:"/Dashboard",
            component:Dashboard,
            icon:"grid",
            position: "sidebar",
            details: ""
        },
        {
            name:"Profile",
            path:"/client-profile",
            component:ClientProfile,
            icon:"user",
            position: "sidebar",
            details: ""
        },
        {
            name:"Asset",
            path:"/select-assets",
            component:SelectAssets,
            icon:"",
            position: "dashboard",
            details: "Select an Asset to view it's performance on the Dashboard"
        },
        {
            name:"Variables",
            path:"/update-variables",
            component:UpdateVariables,
            icon:"",
            position: "dashboard",
            details: "Update Variables to filter the statistics on the Dashboard"
        },
        {
            name:"Rules",
            path:"/set-rules",
            component:AddRules,
            icon:"",
            position: "dashboard",
            details: "Set custom rules to filter data points in the chart."
        }
    ]
}