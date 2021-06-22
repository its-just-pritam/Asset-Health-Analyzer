import React from 'react';
import { Link } from 'react-router-dom';
import '@scuf/common/honeywell-compact-dark/theme.css';
import { Grid, Card, SidebarLayout, Footer, Header, Icon, Notification, Popup } from '@scuf/common';
import SubHeader from '../components/subheader'
import ChartComp from '../components/chartComp';

class Dashboard extends React.Component<{}, { [key: string]: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            settingsCollapsed: false,
            items: [
                {name: 'Cold Storage', content: <div className="placeholder max-width" /> }, 
            ],
            dashButtons: [
                "Select an Asset to view it's performance on the Dashboard",
                "Add Variables to view it's statistics on the Dashboard",
                "Add an Event to receive notification on the Dashboard whenever it occurs",
                "Display errors and anomalies detected during Asset analysis",
                "Remove Variables to hide it's statistics on the Dashboard",
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
    }
    
    onCollapsedClick() {
        this.setState((prevState) => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
    }

    onSettingsCollapsedClick() {
        this.setState((prevState) => ({ settingsCollapsed: !prevState.settingsCollapsed }));
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
        const { sidebarCollapsed, settingsCollapsed, Notif } = this.state;
        return (
            <section className="page-example-wrap">
                <Header title="Asset Health Analyzer"  onMenuToggle={() => this.onCollapsedClick()} active={sidebarCollapsed}>
                    <SubHeader />
                </Header>
                <SidebarLayout collapsed={sidebarCollapsed} className="example-sidebar">
                <SidebarLayout.Sidebar>
                        <Link to="/">
                            <SidebarLayout.Sidebar.Item content="Home" icon="home" />
                        </Link>
                        <SidebarLayout.Sidebar.Item content="Dashboard" active={true} icon="grid"/>
                        <SidebarLayout.Sidebar.BadgedItem content="Notifications" icon="notification" badge="2" />
                        <SidebarLayout.Sidebar.Submenu
                            content="Settings"
                            icon="settings" 
                            open={settingsCollapsed}  
                            onClick={() => this.onSettingsCollapsedClick()}
                        >
                            <SidebarLayout.Sidebar.Item content="Power" icon="battery-mid" />
                            <SidebarLayout.Sidebar.Item content="Time" icon="time" />
                        </SidebarLayout.Sidebar.Submenu>
                    </SidebarLayout.Sidebar>
                    <SidebarLayout.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={10}>
                                <div style={{marginTop: '2em'}}><h1>Asset Dashboard</h1></div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4} mOrder={3} sOrder={1} >
                                    <Card>
                                    <Card.Header title='Select Asset'> {this.genInfo(0)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                        </Card.Content>
                                        <Link to="/select-assets">
                                            <Card.Footer>
                                                <Icon root="common" name="caret-right" className="right"/>
                                            </Card.Footer>
                                        </Link>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={3} mOrder={1} sOrder={3}>
                                    <Card>
                                        <Card.Header title='Add Variables'> {this.genInfo(1)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                        </Card.Content>
                                        <Link to="/add-variables">
                                            <Card.Footer>
                                                <Icon root="common" name="caret-right" className="right"/>
                                            </Card.Footer>
                                        </Link>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={3} mOrder={1} sOrder={3}>
                                    <Card>
                                        <Card.Header title='Add Events'> {this.genInfo(2)} </Card.Header>
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
                                    <Card>
                                        <Card.Header title="Show Faults"> {this.genInfo(3)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                        </Card.Content>
                                        <Card.Footer>
                                            <Icon root="common" name="caret-right" className="right"/>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={3} mOrder={2} sOrder={2}>
                                    <Card>
                                        <Card.Header title="Remove Variables"> {this.genInfo(4)} </Card.Header>
                                        <Card.Content>
                                            <div style={{marginTop: '3em'}}></div>
                                        </Card.Content>
                                        <Link to="/remove-variables">
                                        <Card.Footer>
                                            <Icon root="common" name="caret-right" className="right"/>
                                        </Card.Footer>
                                        </Link>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={3} mOrder={2} sOrder={2}>
                                    <Card>
                                        <Card.Header title="Add Rules"> {this.genInfo(5)} </Card.Header>
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
                                <Grid.Column width={10} mWidth={10}>
                                    <div>
                                        {Notif.map((item: any) => this.genNotif(item))}
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <ChartComp />
                        </Grid>
                    </SidebarLayout.Content>
                </SidebarLayout>
                <Footer>
                    <Footer.Item href="#">Terms & Conditions</Footer.Item>
                    <Footer.Item href="#">Privacy Policy</Footer.Item>    
                </Footer>
            </section>
        )
    }
}

export default Dashboard;