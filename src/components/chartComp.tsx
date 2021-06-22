import { TimeSeries } from "@scuf/charts";
import { Grid, Card, Icon, DatePicker } from "@scuf/common";
import axios from "axios";
import { useState } from "react";

export default function ChartComp() {

    // eslint-disable-next-line
    const [value, setValue] = useState([]);
    // eslint-disable-next-line
    const [temp, setTemp] = useState([0]);
    // eslint-disable-next-line
    const [hum, setHum] = useState([0]);

    async function updateData(date: any) {
        let newData = await APIcallGraph(date);
        setValue(newData!);

        let [tempData, humidityData] = ImportChartData(newData);
        setTemp(tempData);
        setHum(humidityData);
    }

    // console.log(value);
    // console.log(temp);
    // console.log(hum);

    return (
        <Grid.Row>
            <Grid.Column width={10} mWidth={12}>
                <Card>
                    <Card.Header title="Cold Storage"> <Icon name="settings"/></Card.Header>
                    <Card.Content>
                    <div style={{margin: "1em 0 1em 0"}} >
                        <DatePicker label="Pick a date" value={new Date()} onChange={async (date) => await updateData(date)} />
                    </div>
                        <TimeSeries showRangeSelector={false}>
                            <TimeSeries.Line name="Temperature" data={temp} color="#E35F61" />
                        </TimeSeries>
                        <TimeSeries showRangeSelector={false}>
                            <TimeSeries.Line name="Humidity" data={hum} color="#5E97EA" />
                        </TimeSeries>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </Grid.Row>
    );
}

function ImportChartData(data: any) {

    let tempData = [];
    let humidityData = [];

    for( const i in data )
    {
        // console.log(data[i].temperature);
        // console.log(data[i].humidity);
        tempData.push(Math.floor(data[i].temperature!));
        humidityData.push(Math.floor(data[i].humidity));
    }

    return [tempData, humidityData];
}

async function APIcallGraph(value: any) {

    const path = initializePath(value);

    function initializePath(value: any) {

        let newPath = {
            date: "",
            month: "",
            year: ""
        };

        if( value.getMonth() >= 9 )
            newPath.month = String(value.getMonth()+1);
        else
            newPath.month = "0" + String(value.getMonth()+1);

        newPath.year = String(value.getFullYear());

        if( value.getDate() < 10 )
            newPath.date = "0" + String(value.getDate());
        else
            newPath.date = String(value.getDate());

        return newPath;
    }

    console.log(path);
    
    const dataURL = `http://localhost:5000/getData/charts`;
    const downloadURL = `http://localhost:5000/downloadBlob`;

    await axios.get(downloadURL)
    .then((res) => {
        // console.log(res);
    }).catch((err) => {
        console.log(err);
    });

    let returnData;

    await axios.get(dataURL)
    .then((res) => {
        // console.log(res.data);
        returnData = res.data;
    }).catch((err) => {
        console.log(err);
        returnData = [];
    });

    return returnData;

}