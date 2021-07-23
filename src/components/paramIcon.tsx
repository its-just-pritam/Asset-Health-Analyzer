const data = JSON.stringify({
    temperature: {
        root: "common",
        icon: "temperature-hot",
        unit: "° C"
    },
    humidity: {
        root: "common",
        icon: "cloud-rain",
        unit: " %"
    },
    default: {
        root: "building",
        icon: "dashboard",
        unit: ""
    }
});

export const ParamIcon = (variable: string) => {

    if( JSON.parse(data)[variable] === undefined )
        return [
            JSON.parse(data)[`default`].root,
            JSON.parse(data)[`default`].icon,
            JSON.parse(data)[`default`].unit
        ];
    else
        return [
            JSON.parse(data)[variable].root,
            JSON.parse(data)[variable].icon,
            JSON.parse(data)[variable].unit
        ];

};