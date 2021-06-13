import { Chart } from "@scuf/charts";

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
        plot: [30,33,40,52,58,64,75,68,61,57,50,40],
        color: "white"
    }
];

export function genChart(item: any){
    return(
        <Chart.Line name={item.variable} data={item.plot} color={item.color}/>
    )
}