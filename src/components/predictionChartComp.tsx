import { Grid, Card, Icon, Button, Notification, Divider, Popup } from "@scuf/common";
import { useState } from "react";
import React from 'react';
import { getPredictionData, storageDataParams, storageDataRules } from "./storage";
import { useSSOClient } from "@forge/sso-client/dist";
import { Redirect, useHistory } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";
import { CustomSlider } from "./customSlider";
import { getColorsList } from "./colorParams";
import { ChartDataConfig, ChartOptionsConfig } from "./chartConfig/line";
import { PieDataConfig, PieOptionsConfig } from "./chartConfig/pie";
import FaultyData from "../pages/FaultyData";
import { fetchFaultyPredData } from "./Data";

export default function PredictChartComp() {
    const { user } = useSSOClient();
    const token = user?.access_token;
    let params = storageDataParams();

    const colors = getColorsList();
    const [counter, setCounter] = useState(1);
    const [API, setAPI] = useState([{}]);
    const [data, setData] = useState([{
        dates: []
    }]);
    const [len, setLen] = useState(0);
    const [hideChart, setHideChart] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [slider, setSlider] = useState([0,0]);
    const [buttonsFault, setButtonsFault] = useState(true);
    const [label, setLabel] = useState(false);
    const [modal, setModal] = useState(false);
    let limits = storageDataRules();

    async function fetchData() {
        
        if( params[0] === "Select a variable!" ) return;

        setLoading(true);

        let APIdata = await getPredictionData(token, counter);
        console.log(APIdata);
        
        let chartData = await handleAPI(APIdata);
        console.log(chartData);
        await setData(chartData);

        setLoading(false);
        setHideChart(false);
        setButtonsFault(false);

        await setAPI(APIdata!);

    }


    async function handleAPI(APIata: any) {

        if(APIata === null) return [];
        
        let newData = [];

        for( let i in params )
        {
            let elem = {
                type: "",
                accuracy: 0,
                values: [],
                dates: [],
                faults: []
            };

            try {
                elem.type = params[i];
                elem.accuracy = parseFloat((100 * APIata[`${params[i]}`][`score`]).toFixed(2));
                elem.values = APIata[`${params[i]}`][`pred`]?.map((item: any) => parseFloat(item.toFixed(2)));
                elem.dates = APIata[`timestamp_array`]?.map((item: any) => new Date(item).toLocaleString());
                elem.faults = APIata[`${params[i]}`][`outliers`]?.map((item: any) => item); 
            } catch(e) {
                console.log("Invalid json file received!");
            }

            await newData.push(elem);
            await setLen(elem?.dates.length);

            setSlider([0, elem.values.length-1]);

        }
        
        return newData;

    }

    function showChart(item: any, index: any) {

        if( item === undefined || item.accuracy === 0 )
            return (
                <div style={{margin: "2em 0 2em 0", padding: "0 5em 0 5em"}}>
                    <Notification
                        hasIcon={true}
                        title="Unable to perform prediction !"
                        tags={[item.type]}
                        severity="critical">
                        Please wait for a few seconds and retry once again
                    </Notification>
                </div>
            );
        else {
                let variablename = item.type.charAt(0).toUpperCase() + item.type.slice(1);
                let yaxis = item.values.slice(slider[0], slider[1]+1);
                let xaxis = item.dates.slice(slider[0], slider[1]+1);
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

                const ChartData = ChartDataConfig(xaxis, yaxis, variablename, bgcolors, slider, index);
                const Options = ChartOptionsConfig(variablename, item.faults, slider, setLabel, label, userFault, item.values, limits[`${params[index]}`]);

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

        if( item === undefined || item.accuracy === 0 )
            return;
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
                const ChartData = PieDataConfig([sumFaults, item.faults.length - sumFaults], variablename);
                const Options = PieOptionsConfig(variablename);
                let maxVal = Math.max(...item.values.map((val: any) => val));
                let minVal = Math.min(...item.values.map((val: any) => val));
                let score = `${item.accuracy}%`;

                return (
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Card interactive={true} >
                                <Card.Content>
                                <h2 style={{textAlign: "center", margin: "0 0 1em 0"}}>
                                    {variablename}
                                </h2>
                                <h5>
                                    Min[<span style={{color: "#73DCFF"}}>{minVal}</span>] &nbsp; &nbsp; 
                                    Max[<span style={{color: "#9C73FF"}}>{maxVal}</span>] &nbsp; &nbsp; 
                                    Accuracy[<span style={{color: "#FFDA73"}}>{score}</span>]
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

    function toggleLoader() {
        
        if( isLoading )
            return (
                <div style={{textAlign: "center", margin: "1em 0"}}>
                    <Icon name="refresh" size="medium" loading={isLoading}/>
                    Predicting future data...
                </div>
            );
    }

    function openModal(){
        if(modal === true)
        {
            return FaultyData(modal, setModal, fetchFaultyPredData(API, params, limits), "predicted");
        } 
    }

    function toggleChartContent() {
        
        if( hideChart || params[0] === "Select a variable!" )
            return (
                <h3 style={{textAlign: "center", margin: "4em 0"}}>
                    Set a counter value and click on PREDICT to fetch data.
                </h3>
            );
        else if( data[0] === undefined || data[0].dates[0] === undefined )
            return (
                <div style={{margin: "2em 0 2em 0", padding: "0 5em 0 5em"}}>
                    <Notification
                        hasIcon={true}
                        title="Unable to perform prediction !"
                        severity="critical">
                        Please wait for a few seconds and retry once again
                    </Notification>
                </div>
            );
        else{
            const range = slider[1] - slider[0] + 1;
            return (<>
                        <Divider />
                        <h2 style={{textAlign: "center"}}>
                            Timeseries Charts
                        </h2>
                        {data.map((item: any, index: any) => showChart(item, index))}
                            <ul style={{display: "flex", textAlign: "center", listStyle: "none", flexDirection: "row", width: "100%", paddingLeft: "0"}}>
                                <li style={{margin: "auto"}}>
                                    <Icon root="common" name="time" size="medium"/> &nbsp; &nbsp; &nbsp; Start Time: <span style={{color: "#45A7EA"}}>{data[0]?.dates[slider[0]]}</span>
                                </li>
                                <li style={{margin: "auto"}}>
                                    <Icon root="common" name="visible" size="medium"/> &nbsp; &nbsp; &nbsp; Points Visible: <span style={{color: "#45A7EA"}}>{range?.toString()}</span>
                                </li>
                                <li style={{margin: "auto"}}>
                                    <Icon root="common" name="timer" size="medium"/> &nbsp; &nbsp; &nbsp; End Time: <span style={{color: "#45A7EA"}}>{data[0]?.dates[slider[1]]}</span>
                                </li>
                            </ul>
                            <div style={{margin: "2em 4em 2em 4em"}}>
                                <CustomSlider 
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider" 
                                    value={slider}
                                    max={len-1}
                                    min={0}
                                    onChange={(event: object, value: any) => {
                                        setSlider(value);
                                    }}
                                />
                            </div>
                    </>
                );
            }
    }

    function togglePieContent() {
        
        if( !hideChart && data[0] !== undefined && data[0].dates[0] !== undefined && params[0] !== "Select a variable!" )
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
            <div style={{margin: "1em 0 2em 0"}} >
                <h3 style={{textAlign: "center", margin: "4em 0"}}>
                    Please Select an Asset and variable(s) before fetching data.
                </h3>
            </div>
        );
    }
    else
        return (<>
                    <div style={{margin: "1em 0 2em 0"}} >
                        <h4>Prediction Counter :</h4>
                        <div style={{margin: "0 1em"}}>
                            <CustomSlider 
                                min={1} 
                                max={500}
                                valueLabelDisplay="auto"
                                value={counter}
                                onChange={(event: object, value: any) => {
                                        setCounter(value);
                                    }} 
                            />
                        </div>
                        <div style={{margin: "2em 0 0 1em"}} >
                            <Button onClick={() => fetchData()}>Predict</Button>
                        </div>
                    </div>
                    { toggleLoader() }
                    { toggleChartContent() }
                    <div style={{margin: "1em 0 0 0", textAlign: "center"}}>
                        <Divider />
                        <h2 style={{textAlign: "center"}}>
                            Details &nbsp;
                            <Popup element={<Icon root="global" name="badge-info" size="medium"/>} on="hover">
                                <Card>
                                    <Card.Content>
                                        Clicking on "MORE DETAILS..." button will show faulty data in a table. 
                                    </Card.Content>
                                </Card>
                            </Popup>
                        </h2>
                        {openModal()}
                        { togglePieContent() }
                        <Button type="inline" disabled={buttonsFault} onClick={() => setModal(true)} >MORE DETAILS...</Button>
                        <br/> <br/> <br/>
                    </div>
                </>
        );
}
