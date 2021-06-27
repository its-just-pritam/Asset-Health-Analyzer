import { TimeSeries } from "@scuf/charts";
import { Grid, Card, Icon, DatePicker, Button } from "@scuf/common";
import axios from "axios";
import { useState } from "react";
import React, {Component} from 'react';

export default function ChartComp() {

    // eslint-disable-next-line
    let params = JSON.parse(localStorage.getItem('parameters')!).params || ["Select a variable!"];
    if( params[0] === undefined )
        params = ["Select a variable!"];
    const colors = ["#E35F61", "#5E97EA", "#F3FFA1", "FDB3F8", "8CFF84"];
    const [value, setValue] = useState([]);
    const [date, setDate] = useState(new Date());

    const [data, setData] = useState([[0]]);

    function showChart(item: any, index: any) {
        return (
            <TimeSeries showRangeSelector={false}>
                <TimeSeries.Area name={params[index].charAt(0).toUpperCase() + params[index].slice(1)} data={item} color={colors[index]} />
                <TimeSeries.XAxis visible={false} />
            </TimeSeries>
        );
    }

    async function updateDate(date: any) {
        // Date to be updated here
    }

    async function updateData(date: any) {
        let newValue = await APIcallGraph(date);
        await setValue(newValue!);

        return newValue;
    }

    async function displayChart() {
        let newValue = await updateData(date);

        let newData = await ImportChartData(newValue, params);
        await setData(newData!);
    }

    // console.log(value);

    return (
        <Grid.Row>
            <Grid.Column width={10} mWidth={12}>
                <Card>
                    <Card.Header title="Cold Storage"> <Icon name="settings"/></Card.Header>
                    <Card.Content>
                        <div style={{margin: "1em 0 0.5em 0"}} >
                            <DatePicker label="Pick a date" value={new Date()} onChange={async (date) => await updateDate(date)} />
                        </div>
                        <div style={{margin: "0 0 2em 0"}} >
                            <Button content="Refresh Chart" onClick={() => displayChart()} />
                        </div>
                        {data.map((item: any, index: any) => showChart(item, index))}
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid.Row>
    );
}

async function ImportChartData(value: any, params: any) {

    console.log(value);
    let newData = [];
    // console.log(params);

    for( let i in params )
    {
        let elem = [];
        try {
            switch(params[i]) 
            {
                case "temperature" : elem = await value.map((item: any) => [Date.parse(item.EventEnqueuedUtcTime), item.temperature]); break;
                case "humidity" : elem = await value.map((item: any) => [Date.parse(item.EventEnqueuedUtcTime), item.humidity]); break;
            }
        } catch(e) {
            console.log("Invalid json file received!");
        }

        newData.push(elem);
        // console.log(elem);
    }
    
    console.log(newData);
    
    return newData;
}

async function APIcallGraph(value: any) {

    let returnData;
    let pointID = 1;
    let start = "June 21 2021 16:44:00";
    let end = "June 21 2021 16:46:00"
    
    const URL = `http://localhost:5000/getData/charts?jobid=h442163`;
    const dataURL = `https://forge-asset-health-analyzer-oc-api-yjlckngn-dev.apps.dev.aro.forgeapp.honeywell.com/api/events?pointId=${pointID}&start=${start}&end=${end}`;

    await axios.get(URL)
    .then((res) => {
        console.log(res.data);
        returnData = res.data;
    }).catch((err) => {
        console.log(err);
        returnData = [];
    });

    return returnData;

}