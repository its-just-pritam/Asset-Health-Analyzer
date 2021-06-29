import { TimeSeries } from "@scuf/charts";
import { Grid, Card, Icon, DatePicker, Button } from "@scuf/common";
import axios from "axios";
import { useEffect, useState } from "react";
import React, {Component} from 'react';
import { getChartsData, storageDataParams } from "./storage";

export default function ChartComp() {

    // eslint-disable-next-lines
    let params = storageDataParams();
    const colors = ["#E35F61", "#5E97EA", "#F3FFA1", "FDB3F8", "8CFF84"];
    const [date, setDateTime] = useState(new Date());
    const [data, setData] = useState([[0]]);

    useEffect(() => {

        async function InsideEffect() {

            const start = new Date(date);
            const end = new Date(date);
            await end.setDate(end.getDate()+1);
            // await console.log(start.getDate() + " " + end.getDate());

            let APIdata = await getChartsData(start, end);
            console.log(APIdata);

            let chartData = await handleAPI(APIdata);
            console.log(chartData);
            await setData(chartData);
        }

        InsideEffect();

    }, [date]);

    async function handleAPI(APIata: any) {
        
        let newData = [];

        for( let i in params )
        {
            let elem;
            try {
                switch(params[i]) 
                {
                    case "temperature" : elem = APIata.map((item: any) => [Date.parse(item.EventEnqueuedUtcTime), item.temperature]); break;
                    case "humidity" : elem = APIata.map((item: any) => [Date.parse(item.EventEnqueuedUtcTime), item.humidity]); break;
                }
            } catch(e) {
                console.log("Invalid json file received!");
            }

            await newData.push(elem);
        }
        
        return newData;

    }

    function showChart(item: any, index: any) {
        return (
            <TimeSeries showRangeSelector={false}>
                <TimeSeries.Area name={params[index].charAt(0).toUpperCase() + params[index].slice(1)} data={item} color={colors[index]} />
                <TimeSeries.XAxis visible={false} />
            </TimeSeries>
        );
    }

    async function updateDate(temp_date: any) {
        // Date to be updated here
        await setDateTime(temp_date);
    }

    return (
        <Grid.Row>
            <Grid.Column width={10} mWidth={12}>
                <Card>
                    <Card.Header title="Cold Storage"> <Icon name="settings"/></Card.Header>
                    <Card.Content>
                        <div style={{margin: "1em 0 0.5em 0"}} >
                            <DatePicker label="Pick a date" value={new Date()} onChange={async (date) => await updateDate(date)} />
                        </div>
                        {/* <div style={{margin: "0 0 2em 0"}} >
                            <Button content="Refresh Chart" onClick={() => displayChart()} />
                        </div> */}
                        {data.map((item: any, index: any) => showChart(item, index))}
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid.Row>
    );
}
