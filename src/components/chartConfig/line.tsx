import { getColorsList } from "../colorParams";
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from "chart.js";
Chart.register(annotationPlugin);

const colors = getColorsList();

export const ChartDataConfig = (xaxis: any, yaxis: any, variablename: any, bgcolors: any, slider: any, index : any) => {
    return {
        labels: xaxis,
        datasets :[{
            label: variablename,
            fontColor: "white",
            data: yaxis,
            pointBackgroundColor: (slider === "disabled")? bgcolors : bgcolors.filter((e: any, i: any) => i >= slider[0] && i <= slider[1] ),
            backgroundColor: colors[index],
            borderWidth: 0.5,
            pointBorderWidth: 0,
            borderColor: colors[index],
            pointRadius: 1,
            pointHoverRadius: 5,
        }]
    }
};

export const ChartOptionsConfig = (variablename: any, faults: any, slider: any, callbackFun: any, lineLabel: any, userFault: any, item: any,  rules: any) => { 

    let lowBool = ( rules[0] === null )? false : true;
    let upBool = ( rules[1] === null )? false : true;

    let Options = {
        responsive: true,
        title: {
            text: variablename + " vs. Time",
            display: true
        },
        plugins: {
            legend: {
                labels: {
                    color: "white",
                    marginBottom: "100px"
                }
            },
            tooltip: {
                callbacks: {
                footer: (tooltipItems: any) => {
                        let pos = (slider === "disabled")? 0 : slider[0];

                        if( !userFault ) {
                            let faultType = ( faults[tooltipItems[0].dataIndex + pos] === 0 )? "No" : "Yes";
                            return "Faulty? " + faultType;
                        } else {
                            let larger = ( !upBool )? Number.MAX_SAFE_INTEGER : rules[1];
                            let smaller = ( !lowBool )? Number.MIN_SAFE_INTEGER : rules[0];
                            let faultType = ( item[tooltipItems[0].dataIndex + pos] > larger || item[tooltipItems[0].dataIndex + pos] < smaller )? "Yes" : "No";
                            return "Faulty? " + faultType;
                        }
                    },
                }
            },
            annotation: {
                drawTime: "afterDraw",
                annotations: [
                    {
                        display: lowBool,
                        type: 'line',
                        yMin: rules[0],
                        yMax: rules[0],
                        borderColor: '#FFB0C8',
                        borderWidth: 1,
                        borderHoverWidth: 2,
                        enter: (context: any) => {
                            callbackFun(true);
                        },
                        leave: (context: any) => {
                            callbackFun(false);
                        },
                        label: {
                            content: "Lower Limit:  " + rules[0],
                            enabled: lineLabel,
                            position: "right"
                        }
                      
                    },
                    {
                        display: upBool,
                        type: 'line',
                        yMin: rules[1],
                        yMax: rules[1],
                        borderColor: '#B0DDFF',
                        borderWidth: 1,
                        enter: (context: any) => {
                            callbackFun(true);
                        },
                        leave: (context: any) => {
                            callbackFun(false);
                        },
                        label: {
                            content: "Upper Limit:  " + rules[1],
                            enabled: lineLabel,
                            position: "right"
                        }
                      
                    }
                ]
            },
        },
        animation: false,
        hover: {
            animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        scales: {
            y: {
                ticks: {
                    autoSkip: false,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    color: "white"
                },
                grid: {
                    color: "black"
                }
            },
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false
                }
            },
        }
    }

    return Options;
};