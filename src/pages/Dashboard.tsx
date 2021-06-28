import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Icon, Notification, Popup, Badge } from '@scuf/common';
import ChartComp from '../components/chartComp';
import { getPrivateRoutesList } from '../components/PrivateRoutes/PrivateRouteConfig'
import { storageDataAssets, storageDataParams } from '../components/storage';

class Dashboard extends React.Component<{}, { [key: string]: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            colors: ["#E35F61", "#5E97EA", "#F3FFA1", "#FDB3F8", "#8CFF84"],
            params: storageDataParams(),
            assets : storageDataAssets(),
            assetNames: ["---Select an Asset---", "Raspberry Pi", "Washing Machine", "Air Conditioner"],
            routes: getPrivateRoutesList(),
            dashButtons: [
                "Select an Asset to view it's performance on the Dashboard",
                "Add an Event to receive notification on the Dashboard whenever it occurs",
                "Display errors and anomalies detected during Asset analysis",
                "Update Variables to filter the statistics on the Dashboard",
                "Add appropiate rules to govern functionalities of Assets"
            ],
            Notif: [
                {   title: "Critical Pump Failure", 
                    tags: ['Refinery', 'Pump'], 
                    severity: "critical", 
                    details: "Excessive pump vibration caused by a failing metal frame.",
                },
                {   title: "Freight XYZ-123, to be updated", 
                    tags: ['Refinery', 'Pump'], 
                    severity: "important", 
                    details: "Freight reached its destination (Atlanta Midtown).",
                },
                {   title: "Critical Pump Failure", 
                    tags: ['Bombadier', 'Challenger 300', 'ATA 49', 'Auxiliary Power Unit'], 
                    severity: "information", 
                    details: "Auxiliary Power Unit replacement is due in next 30 days.",
                },
                {   title: "Everything is Fine", 
                    tags: ['Bombadier', 'Challenger 300', 'ATA 49', 'Auxiliary Power Unit'], 
                    severity: "success", 
                    details: "Building is running optimal power consumption.",
                },
            ],
        }
        console.log(this.state.params);
    }

    genInfo(pos: any){
        return(
            <Popup className="popup-theme-wrap" 
            element={<Icon name="badge-info" root="common" />}
            position="right center" 
            hideOnScroll>
                <Card>
                    <Card.Content>
                        {this.state.dashButtons[pos]}
                    </Card.Content>
                </Card>
            </Popup>
        )
    }

    showParameters(item: any, index: any) {
        
        return (
            <div style={{color: this.state.colors[index]}}>
                {item.charAt(0).toUpperCase() + item.slice(1)}<br/><br/>
            </div>
        )
    }

    // showAltParam() {

    //     if( JSON.parse(localStorage.getItem('parameters')!).params === undefined ) return(<></>);
    //     if( JSON.parse(localStorage.getItem('parameters')!).params[0] === undefined )
    //         return (
    //             <div style={{color: "#E35F61"}}>
    //                 Select a variable!
    //             </div>
    //         )
    //     else return(<></>);
    // }

    showAsset() {
        let name = this.state.assetNames[this.state.assets];
        console.log(this.state.assets);
        return (
            <div>
                {name.charAt(0).toUpperCase() + name.slice(1)}<br/><br/>
            </div>
        )
    }

    genNotif(item: any) {
        return (
            <Notification
                hasIcon={true}
                title= {item.title}
                tags= {item.tags}
                severity= {item.severity}>
                {item.details}
            </Notification>
        )
    }
    
    render() {
        const { routes, Notif, params, assets } = this.state;
        return (
            <section className="page-example-wrap">
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={10}>
                                <div style={{marginTop: '2em'}}><h1>Asset Dashboard</h1></div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4} mOrder={3} sOrder={1} >
                                    <Card style={{height: "300px"}}>
                                    <Card.Header title={routes[2].name}> {this.genInfo(0)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                            <h2>
                                                {this.showAsset()}
                                            </h2>
                                        </Card.Content>
                                        <Link to={routes[2].path}>
                                            <Card.Footer>
                                                <Icon root="common" name="caret-right" className="right"/>
                                            </Card.Footer>
                                        </Link>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={6} mOrder={1} sOrder={3}>
                                    <Card style={{height: "300px"}}>
                                        <Card.Header title='Add Events'> {this.genInfo(1)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                        </Card.Content>
                                        <Card.Footer>
                                            <Icon root="common" name="caret-right" className="right"/>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4} mOrder={2} sOrder={2}>
                                    <Card style={{height: "300px"}}>
                                        <Card.Header title="Show Faults"> {this.genInfo(2)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                        </Card.Content>
                                        <Card.Footer>
                                            <Icon root="common" name="caret-right" className="right"/>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={3} mOrder={2} sOrder={2}>
                                    <Card style={{height: "300px"}}>
                                        <Card.Header title={routes[5].name}> {this.genInfo(3)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                            <h4>
                                                {params.map((item: any, index: any) => this.showParameters(item, index))}
                                            </h4>
                                        </Card.Content>
                                        <Link to={routes[5].path}>
                                        <Card.Footer>
                                            <Icon root="common" name="caret-right" className="right"/>
                                        </Card.Footer>
                                        </Link>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={3} mOrder={2} sOrder={2}>
                                    <Card style={{height: "300px"}}>
                                        <Card.Header title="Add Rules"> {this.genInfo(4)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                        </Card.Content>
                                        <Card.Footer>
                                            <Icon root="common" name="caret-right" className="right"/>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            {/* <Grid.Row>
                                <Grid.Column width={10} mWidth={10}>
                                    <div>
                                        {Notif.map((item: any) => this.genNotif(item))}
                                    </div>
                                </Grid.Column>
                            </Grid.Row> */}
                            <ChartComp />
                        </Grid>
            </section>
        )
    }
}

export default Dashboard;