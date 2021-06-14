import { Chart, TimeSeries } from "@scuf/charts";

export const graph_data = [
    {
        variable: "Temperature",
        plot: [51,54,62,70,73,78,79,76,72,67,61,52],
        color: "#e01616"
    },
    {
        variable: "Humidity",
        plot: [35,37,43,51,60,67,70,69,64,54,43,37],
        color: "#1e87d8"
    },
    {
        variable: "Pressure",
        plot: [30,38,45,51,55,59,64,58,51,43,35,30],
        color: "white"
    }
];

export function genChart(item: any){
    return(
        <TimeSeries>
            <TimeSeries.Line name={item.variable} data={item.plot} color={item.color}/>
        </TimeSeries>
    )
}