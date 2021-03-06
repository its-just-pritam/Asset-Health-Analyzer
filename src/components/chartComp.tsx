import { Grid, Card, Icon, DatePicker, Button, Notification, Radio, Divider, Popup} from "@scuf/common";
import { useState } from "react";
import React from 'react';
import { getChartsData, storageDataParams, storageDataRules } from "./storage";
import { useSSOClient } from "@forge/sso-client/dist";
import { Redirect } from "react-router-dom";
import { Pie, Line } from 'react-chartjs-2';
import { CustomSlider } from "./customSlider";
import { getColorsList } from "./colorParams";
import { ChartDataConfig, ChartOptionsConfig } from "./chartConfig/line";
import { PieDataConfig, PieOptionsConfig } from "./chartConfig/pie";
import FaultyData from "../pages/FaultyData";
import { fetchFaultyData, handleFaults, handleTimestamps } from "./Data";

const RadioButtons = [
    {label: "30 min", value: 30 },
    {label: "60 min", value: 60 },
    {label: "2 hr", value: 120 },
    {label: "4 hr", value: 240 },
    {label: "6 hr", value: 360 },
    {label: "12 hr", value: 720 }
]; 

export default function ChartComp() {

    // eslint-disable-next-lines
    const { user } = useSSOClient();
    const token = user?.access_token;
    let params = storageDataParams();
    let limits = storageDataRules();

    const colors = getColorsList();
    const [API, setAPI] = useState([{}]);
    const [date, setDateTime] = useState(new Date());
    const [data, setData] = useState([[0]]);
    const [faults, setFaults] = useState([[0]]);
    const [timestamps, setTimestamps] = useState([[0]]);
    const [hideChart, setHideChart] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [window, setWindow] = useState(30);
    const [buttonsFault, setButtonsFault] = useState(true);
    let initSlider: number | number[] = [0,0]
    const [slider, setSlider] = useState(initSlider);
    const [label, setLabel] = useState(false);
    const [modal, setModal] = useState(false);

    async function fetchData() {
        
        setLoading(true);
        const start = new Date(date);
        const end = new Date(date.getTime() + window*60000);        

        let APIdata = await getChartsData(start, end, token);
        console.log(APIdata);

        if( APIdata?.length > 1 )
        {
            APIdata = await APIdata.sort((a: any, b: any) => {
                return ( Date.parse(a.EventEnqueuedUtcTime) - Date.parse(b.EventEnqueuedUtcTime) );
            });
        }
        
        let chartData = await handleAPI(APIdata);
        let newFaults = await handleFaults(APIdata,params);
        let newTimestamps = await handleTimestamps(APIdata,params);

        await setData(chartData);
        await setFaults(newFaults);
        await setTimestamps(newTimestamps);

        setLoading(false);
        setHideChart(false);
        setButtonsFault(false);
        await setAPI(APIdata!);

    }

    async function handleAPI(APIata: any) {
        
        let newData = [];

        for( let i in params )
        {
            let elem;
            try {
                elem = APIata?.map((item: any) => parseFloat(item[params[i]]?.toFixed(2)));
            } catch(e) {
                console.log("Invalid json file received!");
            }

            setSlider([0, elem.length-1]);

            await newData.push(elem);

        }
        
        return newData;

    }

    function showChart(item: any, index: any) {

        if(item === undefined || item[0] === undefined)
            return (
                <div style={{margin: "2em 0 2em 0", padding: "0 5em 0 5em"}}>
                    <Notification
                        hasIcon={true}
                        title="Data not found !"
                        tags={[params[index]]}
                        severity="critical">
                        The device recorded no data on this date. Please select a suitable asset and date.
                    </Notification>
                </div>
            );
        else {
                let variablename = params[index].charAt(0).toUpperCase() + params[index].slice(1);
                let yaxis = item.slice(slider[0], slider[1]+1);
                let xaxis = timestamps[index].slice(slider[0], slider[1]+1);
                let userFault =  ( limits[`${params[index]}`][0] === null && limits[`${params[index]}`][1] === null )? false : true;
                let bgcolors = (userFault)?
                item.map((elem: any) => {
                    let larger = ( limits[`${params[index]}`][1] === null )? Number.MAX_SAFE_INTEGER : limits[`${params[index]}`][1];
                    let smaller = ( limits[`${params[index]}`][0] === null )? Number.MIN_SAFE_INTEGER : limits[`${params[index]}`][0];
                    return ( elem > larger || elem < smaller )? "red" : colors[index];
                })
                :faults[index].map((elem: any) => {
                    return (elem === 0)? colors[index] : "red";
                });

                const ChartData = ChartDataConfig(xaxis, yaxis, variablename, bgcolors, slider, index);
                const Options = ChartOptionsConfig(variablename, faults[index], slider, setLabel, label, userFault, item, limits[`${params[index]}`]);

                return (
                        <div>
                            <div style={{height: "60", backgroundColor: "#202020", padding: "0em 1em 1em 1em"}}>
                                <Line type="line" data={ChartData} options={Options} height={60} />
                            </div>
                        </div>
                );
            }  
    }

    function showPie(item: any, index: any) {

        if(item === undefined || item[0] === undefined)
            return (<></>);
        else {
                let userFault = ( limits[`${params[index]}`][0] === null && limits[`${params[index]}`][1] === null )? false : true;
                let PieFaults = (userFault)?
                item.map((elem: any) => {
                    let larger = ( limits[`${params[index]}`][1] === null )? Number.MAX_SAFE_INTEGER : limits[`${params[index]}`][1];
                    let smaller = ( limits[`${params[index]}`][0] === null )? Number.MIN_SAFE_INTEGER : limits[`${params[index]}`][0];
                    return ( elem > larger || elem < smaller )? 1 : 0;
                })
                : faults[index];

                let variablename = params[index].charAt(0).toUpperCase() + params[index].slice(1);
                let sumFaults = PieFaults.reduce((a: any, b: any) => a+b, 0 );
                const ChartData = PieDataConfig([sumFaults, item.length - sumFaults], variablename);
                const Options = PieOptionsConfig(variablename);
                let maxVal = Math.max(...item.map((val: any) => val));
                let minVal = Math.min(...item.map((val: any) => val));

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

    function toggleLoader() {
        
        if( isLoading )
            return (
                <div style={{textAlign: "center", margin: "1em 0"}}>
                    <Icon name="refresh" size="medium" loading={isLoading}/>
                    Fetching updated data...
                </div>
            );
    }

    function toggleChartContent() {
        
        if( hideChart || params[0] === "Select a variable!" )
            return (
                <h3 style={{textAlign: "center", margin: "4em 0"}}>
                    1. Please set a time-span window.<br/>
                    2. Pick a suitable local date and time. <br/>
                    3. Click on FETCH DATA to download.
                </h3>
            );
        else if(data[0] === undefined || data[0][0] === undefined )
            return (
                <div style={{margin: "2em 0 2em 0", padding: "0 5em 0 5em"}}>
                    <Notification
                        hasIcon={true}
                        title="Data not found !"
                        severity="critical">
                        The device recorded no data on this date. Please select a suitable asset and date.
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
                                    <Icon root="common" name="time" size="medium"/> &nbsp; &nbsp; &nbsp; Start Time: <span style={{color: "#45A7EA"}}>{timestamps[0][slider[0]]?.toString()}</span>
                                </li>
                                <li style={{margin: "auto"}}>
                                    <Icon root="common" name="visible" size="medium"/> &nbsp; &nbsp; &nbsp; Points Visible: <span style={{color: "#45A7EA"}}>{range?.toString()}</span>
                                </li>
                                <li style={{margin: "auto"}}>
                                    <Icon root="common" name="timer" size="medium"/> &nbsp; &nbsp; &nbsp; End Time: <span style={{color: "#45A7EA"}}>{timestamps[0][slider[1]]?.toString()}</span>
                                </li>
                            </ul>
                            <div style={{margin: "2em 4em 2em 4em"}}>
                                <CustomSlider 
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider" 
                                    value={slider}
                                    max={data[0].length-1}
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

    function openModal(){
        if(modal === true)
        {
            return FaultyData(modal, setModal, fetchFaultyData(API, params, limits), "historical");
        } 
    }

    function togglePieContent() {
        
        if( !hideChart && data[0][0] !== undefined && params[0] !== "Select a variable!" )
            return (
                <div style={{margin: "2em 0 4em 0", backgroundColor: "#202020", padding: "2em 0 1em 0"}}>
                    <Grid>
                        {data.map((item: any, index: any) => showPie(item, index))}
                    </Grid>
                </div>
            );
    }

    async function updateDate(temp_date: any) {
        await setDateTime(temp_date);
    }

    function showRadio(item: any) {
        return <Radio label={item.label} checked={window === item.value} onChange={() => setWindow(item.value)} />
    }

    if(user === null || ( new Date(1000 * (user.expires_at)) <= new Date() ))
        return (
            <Redirect to={{ pathname: "/login" }} />
        );
    else if( params[0] === "Select a variable!" ) {
            return (
                <div style={{margin: "2em 0 0.5em 0"}} >
                    <h3 style={{textAlign: "center", margin: "4em 0"}}>
                        Please Select an Asset and variable(s) before fetching historical data.
                    </h3>
                </div>
            );
        }
    else
        return (<>
                    <div style={{margin: "2em 0 0 0"}}>
                        <span style={{margin: "0 1em 0 0", fontSize: "1.5em"}} > Time-span window size :</span>
                        {RadioButtons.map((item: any) => showRadio(item))}
                    </div>
                    <div style={{margin: "1em 0 2em 0"}} >
                        <DatePicker disableFuture={true} type="datetime"  minuteStep={window} value={new Date()} onChange={async (date) => await updateDate(date)} />
                        <span style={{margin: "0 0 0 8em"}} />
                        <Button onClick={() => fetchData()}>Fetch Data</Button>
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
                        { openModal() }
                        { togglePieContent() }
                        <Button type="inline" disabled={buttonsFault} onClick={() => setModal(true)} >MORE DETAILS...</Button>
                        <br/> <br/> <br/>
                    </div>
                </>
        );
}