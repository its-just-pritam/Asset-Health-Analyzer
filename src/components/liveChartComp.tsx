import { TimeSeries } from "@scuf/charts";
import { Grid, Card, Icon, DatePicker, Button, Statistic, Notification, Checkbox, Divider, Popup } from "@scuf/common";
import { useEffect, useState } from "react";
import React from 'react';
import { getChartsData, storageDataAssetPoints, storageDataParams, storageDataRules } from "./storage";
import { useSSOClient } from "@forge/sso-client/dist";
import { io } from "socket.io-client";
import { ParamIcon } from "./paramIcon";
import { Line, Pie } from "react-chartjs-2";
import { getColorsList } from "./colorParams";
import { ChartDataConfig, ChartOptionsConfig } from "./chartConfig/line";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "react-router-dom";
import { PieDataConfig, PieOptionsConfig } from "./chartConfig/pie";

const ToastNotification = ({ message }: any) => (
    <h5 style={{color: "black"}}>
        {message}
    </h5>
)

const notify = (msg: any) => toast(
    <ToastNotification message={msg}/>
);

export default function LiveChartComp() {

    // eslint-disable-next-lines
    const pointId = storageDataAssetPoints();
    const { user } = useSSOClient();
    const token = user?.access_token!;
    let params = storageDataParams();
    let initialData = params.map((item: any) => {
        return {
            type: item,
            values: [],
            faults: []
        };
    });
    let initialCurrent = params.map((item: any) => {
        return {
            type: item,
            value: 0,
            outlier: 0
        };
    });
    let limits = storageDataRules();

    const colors = getColorsList();

    const [hideChart, setHideChart] = useState(true);
    const [data, setData] = useState(initialData);
    const [faults, setFaults] = useState([[0]]);
    const [len, setLen] = useState(0);
    const [current, setCurrent] = useState(initialCurrent);
    const [sock, setSock] = useState(null);
    const [label, setLabel] = useState(false);

    async function SocketHandler(flag: any) {

        if( flag && sock === null ) {

            let socket: any | null = null;
            socket = io('https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/', {
                query: {token, pointId},
                transports: ['websocket'],
            });

            if(socket) {
                console.log("Connection established!");
                await setSock(socket);
                setHideChart(false);
                notify("Connected!");
            }
            else {
                console.log("Connection error!");
                notify("Connection Failed!");
                return;
            }

            socket.on('connect', () => console.log("Socket is Listening"));

            socket.on('disconnect', () => {
                console.log("Connection terminated by server!");
                socket.disconnect();
                socket = null;
                setHideChart(true);
            });

            for( let i in params )
            {

                socket.on(`event:${params[i]}`, async (value: any, outlier: any) => {
                    console.log(`${params[i]}: ${value}, outlier: ${outlier}`);

                    await setData((currentData: any) => {
                        console.log("Updating Data");
                        return [...currentData.slice(0, i), {
                        ...currentData[i], 
                        faults: [...currentData[i].faults, outlier], 
                        values: [...currentData[i].values, parseFloat(value.toFixed(2))]
                        }, ...currentData.slice(i+1)
                    ]});

                    await setCurrent((currentData: any) => [...currentData.slice(0, i), {
                        ...currentData[i], 
                        outlier: outlier, 
                        value: parseFloat(value.toFixed(2))
                        }, ...currentData.slice(i+1)
                    ]);

                    await setLen((currentData: any) => currentData+1);

                    console.log("Data");
                    console.log(data);
                    console.log("Current Data");
                    console.log(current);
                });
            }

        }
        else if( flag && sock !== null ){
            console.log("Connection was already established!");
            notify("Already Connected!");
        }
        else if( !flag && sock !== null ) {

            let socket: any | null = sock;
            console.log("Connection terminated by client!");
            socket?.disconnect();
            socket = null;
            await setSock(socket);
            setHideChart(true);
            notify("Disonnected!");
        }
        else if( !flag && sock === null )
        {
            console.log("Connection does not exist!");
            notify("No Connection exists!");
        }

        console.log(sock);

    }

    function showChart(item: any, index: any) {

        if(item.values[0] === undefined)
            return (
                <div style={{margin: "2em 0 2em 0", padding: "0 5em 0 5em"}}>
                    <Notification
                        hasIcon={true}
                        title="Data not found !"
                        tags={[item.type]}
                        severity="important">
                        The client has not received any live data till now.
                        Please wait for a while otherwise "STOP" and then "STREAM" again.                    
                    </Notification>
                </div>
            );
        else {
                let variablename = item.type.charAt(0).toUpperCase() + item.type.slice(1);
                let maxVal = Math.max(...item.values.map((val: any) => val));
                let minVal = Math.min(...item.values.map((val: any) => val));
                let yaxis = item.values;
                let xaxis = item.values.map((a: any, b: any) => b);
                let userFault = ( limits[`${params[index]}`][0] === null && limits[`${params[index]}`][1] === null )? false : true;
                let bgcolors = (userFault)?
                item.values.map((elem: any) => {
                    let larger = ( limits[`${params[index]}`][1] === null )? Number.MAX_SAFE_INTEGER : limits[`${params[index]}`][1];
                    let smaller = ( limits[`${params[index]}`][0] === null )? Number.MIN_SAFE_INTEGER : limits[`${params[index]}`][0];
                    return ( elem > larger || elem < smaller )? "red" : colors[index];
                })
                : item.faults.map((elem: any) => {
                    return (elem === 0)? colors[index] : "red";
                });

                const ChartData = ChartDataConfig(xaxis, yaxis, variablename, bgcolors, "disabled", index);
                const Options = ChartOptionsConfig(variablename, item.faults, "disabled", setLabel, label, userFault, item.values,  limits[`${params[index]}`]);

                return (
                    <div>
                        <div style={{height: "60", backgroundColor: "#202020", padding: "0 1em 1em 1em"}}>
                            <Line type="line" data={ChartData} options={Options} height={60} />
                        </div>
                    </div>
                );
            }  
    }

    function showPie(item: any, index: any) {

        if(item.values[0] === undefined)
            return ;
        else {
                let userFault = ( limits[`${params[index]}`][0] === null && limits[`${params[index]}`][1] === null )? false : true;
                let PieFaults = (userFault)?
                item.values.map((elem: any) => {
                    let larger = ( limits[`${params[index]}`][1] === null )? Number.MAX_SAFE_INTEGER : limits[`${params[index]}`][1];
                    let smaller = ( limits[`${params[index]}`][0] === null )? Number.MIN_SAFE_INTEGER : limits[`${params[index]}`][0];
                    return ( elem > larger || elem < smaller )? 1 : 0;
                })
                : item.faults;

                let variablename = params[index].charAt(0).toUpperCase() + params[index].slice(1);
                let sumFaults = PieFaults.reduce((a: any, b: any) => a+b, 0 );
                const ChartData = PieDataConfig([sumFaults, item.values.length - sumFaults], variablename);
                const Options = PieOptionsConfig(variablename);
                let maxVal = Math.max(...item.values.map((val: any) => val));
                let minVal = Math.min(...item.values.map((val: any) => val));

                return (
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Card interactive={true} >
                                <Card.Content>
                                <h2 style={{textAlign: "center", margin: "0 0 1em 0"}}>
                                    {variablename}
                                </h2>
                                <h5>
                                    Min[<span style={{color: "#73DCFF"}}>{minVal}</span>] &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Max[<span style={{color: "#9C73FF"}}>{maxVal}</span>]
                                </h5>
                                <Divider />
                                <div style={{display: "flex", alignItems: "center", margin: "auto"}}>
                                    <Pie type="pie" data={ChartData} options={Options} />
                                </div>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                );
            }  
    }

    function toggleChartContent() {
        
        if( hideChart )
            return (
                <h3 style={{textAlign: "center", margin: "4em 0"}}>
                    START: Connects to the server and fetches live data. <br/>
                    STOP: Terminates the connection and stops data flow.
                </h3>
            );
        else{
            let dataPoints = len / params.length;

            return (<>
                        <Divider />
                        <h2 style={{textAlign: "center"}}>
                            Timeseries Charts
                        </h2>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4} >
                                    <Statistic value={Math.floor(dataPoints)} label="Data Points" size="large" iconRoot="common" icon="entity-details" iconPosition="left" color="blue" />
                                </Grid.Column>
                                {current.map((item: any) => {
                                    let iconDetails = ParamIcon(item.type);
                                    let label = item.type.charAt(0).toUpperCase() + item.type.slice(1);
                                    let input = item.value + iconDetails[2];
                                    
                                    let userFault = ( limits[`${item.type}`][0] === null && limits[`${item.type}`][1] === null )? false : true;
                                    let larger = ( limits[`${item.type}`][1] === null )? Number.MAX_SAFE_INTEGER : limits[`${item.type}`][1];
                                    let smaller = ( limits[`${item.type}`][0] === null )? Number.MIN_SAFE_INTEGER : limits[`${item.type}`][0];
                                    
                                    let faultColor: "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "grey" | "black" | "white" | undefined = (userFault)?
                                    ( item.value > larger || item.value < smaller )? "red" : "blue"
                                    : ( item.outlier ) ? "red" : "blue";

                                    return (
                                        <Grid.Column width={4} >
                                            <Statistic value={input} label={label} size="large" iconRoot={iconDetails[0]} icon={iconDetails[1]} iconPosition="left" color={faultColor} />
                                        </Grid.Column>
                                    );
                                })}
                            </Grid.Row>
                        </Grid>
                        <Divider />
                        {data.map((item: any, index: any) => showChart(item, index))}
                    </>
                );
        }
    }

    function togglePieContent() {
        
        if( !hideChart && data[0].values[0] !== undefined )
            return (
                <div style={{margin: "2em 0 4em 0", backgroundColor: "#202020", padding: "2em 0 1em 0"}}>
                    <Grid>
                        {data.map((item: any, index: any) => showPie(item, index))}
                    </Grid>
                </div>
            );
    }


    if(user === null || ( new Date(1000 * (user.expires_at)) <= new Date() ))
        return (
            <Redirect to={{ pathname: "/login" }} />
        );
    else if( params[0] === "Select a variable!" ) {
        return (
            <div style={{margin: "2em 0 0.5em 0"}} >
                <h3 style={{textAlign: "center", margin: "4em 0"}}>
                    Please Select an Asset and variable(s) before streaming data.
                </h3>
            </div>
        );
    }
    else
        return (<>
                    <div style={{margin: "2em 0 0.5em 0"}} />
                    <Button onClick={() => {
                        SocketHandler(true);
                    }}>Stream</Button>
                    <Button onClick={() => {
                        SocketHandler(false);
                    }}>Stop</Button>
                    <ToastContainer newestOnTop={true} />
                    <br/><br/>
                    { toggleChartContent() }
                    <div style={{margin: "1em 0 1em 0", textAlign: "center"}}>
                        <Divider />
                        <h2 style={{textAlign: "center"}}>
                            Details &nbsp;
                        </h2>
                        { togglePieContent() }
                    </div>
                </>
        );
}