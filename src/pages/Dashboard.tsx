import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Grid, Card, Icon, Notification, Popup, Badge, Tab, Stepper, Button } from '@scuf/common';
import ChartComp from '../components/chartComp';
import { getPrivateRoutesList } from '../components/PrivateRoutes/PrivateRouteConfig'
import { storageDataAssets, storageDataParams, storageDataRules } from '../components/storage';
import LiveChartComp from '../components/liveChartComp';
import PredictChartComp from '../components/predictionChartComp';
import { getColorsList } from '../components/colorParams';
import { useSSOClient } from '@forge/sso-client/dist';

export default function Dashboard(props: any) {

    let history = useHistory();
    const { user } = useSSOClient();

    if(user === null || ( new Date(1000 * (user.expires_at)) <= new Date() ))
        return (
            <Redirect to={{ pathname: "/login" }} />
        );
    else
        return (
            <DashboardClass history={history} />
        );
}

export class DashboardClass extends React.Component<{ [key: string]: any }, { [key: string]: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            colors: getColorsList(),
            routes: getPrivateRoutesList(),
            assets : storageDataAssets(),
            params: storageDataParams(),
            limits: storageDataRules(),
            isCardDisabled: ( storageDataAssets() === "---Select an Asset---" )? true : false,
        }
        console.log(this.state.params);
    }

    genInfo(pos: any){
        return(
            <Popup className="popup-theme-wrap" 
            element={<Icon name="badge-info" root="common" />}
            position="right center" 
            on="hover"
            hideOnScroll>
                <Card>
                    <Card.Content>
                        {this.state.routes[pos].details}
                    </Card.Content>
                </Card>
            </Popup>
        )
    }

    showParameters(item: any, index: any) {
        
        return (
            <span style={{color: this.state.colors[index], marginRight: "1em"}}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
            </span>
        )
    }

    showAsset() {
        let name = this.state.assets;
        console.log(this.state.assets);
        return (
            <div>
                {name}
            </div>
        )
    }

    showRules() {

        if(this.state.params[0] === "Select a variable!")
               return;
        else
            return this.state.params.map((item: any, index: any) => {

            let variableName = item.charAt(0).toUpperCase() + item.slice(1);
            let lowB = ( this.state.limits[`${item}`][0] === null )? "" : this.state.limits[`${item}`][0];
            let upB = ( this.state.limits[`${item}`][1] === null )? "" : this.state.limits[`${item}`][1];
            return (
                <div style={{margin: "1em 0", fontSize: "18px"}}>
                    <span style={{width: "200px"}}>{variableName}</span> : &nbsp; [ {lowB} ... {upB} ]
                </div>
            );
        });
    }
    
    render() {
        const { limits, isCardDisabled, routes, params } = this.state;
        return (
            <section className="page-example-wrap">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <div style={{marginTop: '2em'}}><h1>Asset Dashboard</h1></div>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <div style={{margin: '2.5em 0 0 0', textAlign: 'right'}}>
                                        <Button type="secondary" size="small" onClick={() => {
                                            localStorage.removeItem('assets');
                                            localStorage.removeItem('parameters');
                                            localStorage.removeItem('rules');
                                            window.location.reload();
                                        }} >
                                            Clear Setup
                                        </Button>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={11} >
                                    <Card>
                                    <Card.Header title={routes[3].name}> {this.genInfo(3)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '2em'}} />
                                            <h2>
                                                {this.showAsset()}
                                            </h2>
                                        </Card.Content>
                                        <div style={{height: "20px"}} />
                                        <Card.Footer>
                                            <Button data-testid="Asset" onClick={() => this.props.history.push(routes[3].path) } type="inline">SELECT</Button>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={11} >
                                    <Card>
                                        <Card.Header title={routes[4].name}> {this.genInfo(4)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '2em'}} />
                                            <h4>
                                                {params.map((item: any, index: any) => this.showParameters(item, index))}
                                            </h4>
                                        </Card.Content>
                                        <div style={{height: "20px"}} />
                                        <Card.Footer>
                                            <Button onClick={() => this.props.history.push(routes[4].path)} disabled={isCardDisabled} type="inline">SELECT</Button>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={11} >
                                    <Card>
                                        <Card.Header title={routes[5].name}> {this.genInfo(5)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '2em'}} />
                                            { this.showRules() }
                                        </Card.Content>
                                        <div style={{height: "20px"}} />
                                        <Card.Footer>
                                            <Button onClick={() => this.props.history.push(routes[5].path)} disabled={isCardDisabled} type="inline">SELECT</Button>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={11} mWidth={11}>
                                    <Card>
                                        <Card.Header title={storageDataAssets()}> 
                                            <Popup className="popup-theme-wrap" 
                                            element={<Icon root="common" name="badge-info" />}
                                            position="right center" 
                                            on="hover"
                                            hideOnScroll>
                                                <Card>
                                                    <Card.Content>
                                                        <span style={{color: "#45A7EA"}}>Live Chart:</span> Stream live data points of Asset parameters <br/> <br/>
                                                        <span style={{color: "#45A7EA"}}>Historical Chart:</span> Download batch data of previous dates <br/> <br/>
                                                        <span style={{color: "#45A7EA"}}>Show Predictions:</span> Forecast future values of Asset parameters.
                                                    </Card.Content>
                                                </Card>
                                            </Popup>
                                        </Card.Header>
                                        <Card.Content>
                                        <Tab defaultActiveIndex={0} >
                                            <Tab.Pane title="Live Chart" width="3em">
                                                <LiveChartComp />
                                            </Tab.Pane>
                                            <Tab.Pane title="Historical Chart">
                                                <ChartComp />
                                            </Tab.Pane>
                                            <Tab.Pane title="Show Predictions">
                                                <PredictChartComp />
                                            </Tab.Pane>
                                        </Tab>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
            </section>
        )
    }
}