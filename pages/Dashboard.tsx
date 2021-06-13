import React from 'react';
import { Link } from 'react-router-dom';
import '@scuf/common/honeywell-compact-dark/theme.css';
import { Grid, Card, SidebarLayout, Footer, Header, Icon, Button, Table } from '@scuf/common';
import { Chart } from '@scuf/charts';

class Dashboard extends React.Component<{}, { [key: string]: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            settingsCollapsed: false,
            plot1: [51,54,62,70,73,78,79,76,72,67,61,52],
            plot2: [35,37,43,51,60,67,70,69,64,54,43,37],
            items: [
                {name: 'Chart 1', content: <div className="placeholder max-width" /> }, 
                // {name: 'Chart 2', content: <div className="placeholder max-width" /> }
            ],
            details: [
                {name: 'Table 1'},
                // {name: 'Table 2'}
            ],
            specification: [
                {param: 'Length', value: '12.5 meters'},
                {param: 'Maximum acceleration', value: '16 MGLT/s'},
                {param: 'Maximum atmospheric speed', value: '1,050 km/h'},
                {param: 'Engine unit(s)', value: '4x Incom 4L4 fusial thrust engines'},
                {param: 'Hyperdrive rating', value: 'Class 1.0'},
                {param: 'Hyperdrive system', value: 'Incom GBk-585 hyperdrive unit'},
                {param: 'Power plant', value: 'Novaldex O4-Z cryogenic power cell'},
                {param: 'Shielding', value: 'Chempat "Defender" deflector shield generator'},
                {param: 'Hull', value: 'Titanium alloy '},
                {param: 'Targeting systems', value: 'Fabritech ANq 3.6 tracking computer'},
            ],
        }
    }
    
    onCollapsedClick() {
        this.setState((prevState) => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
    }

    onSettingsCollapsedClick() {
        this.setState((prevState) => ({ settingsCollapsed: !prevState.settingsCollapsed }));
    }

    genRow(item: any){
        return (
            <Table.Row key={item.param}>
                <Table.Cell content={item.param} />
                <Table.Cell content={item.value} />
            </Table.Row>
        )
    }

    genTable(item: any){
        return (
            <Grid.Column width={4} mWidth={12} >
                <Card>
                    <Card.Header title={item.name}> <Icon name="settings"/></Card.Header>
                    <Card.Content>
                    <Table>
                        <Table.Header>
                            <Table.HeaderCell content="Parameter" />
                            <Table.HeaderCell content="Value" />
                        </Table.Header>
                        <Table.Body>                                                    
                            {this.state.specification.map((item: any) => this.genRow(item))}                                                                            
                        </Table.Body>
                    </Table>
                    </Card.Content>
                </Card>
            </Grid.Column>
        )
    }
    
    changeGraph() {
        let pos1 = Math.floor(Math.random() * 11);
        let pos2 = Math.floor(Math.random() * 11);
        let val1 = Math.floor(Math.random() * 40) + 49;
        let val2 = Math.floor(Math.random() * 30) + 59;
        let arr1 = this.state.plot1;
        let arr2 = this.state.plot2;
        arr1[pos1] = val1;
        arr2[pos2] = val2;
        this.setState(() => ({ plot1: arr1 }));
        this.setState(() => ({ plot2: arr2 }));
    }

    genCard(item: any, index: any){
        return (
             <Grid.Column width={8} mWidth={12} key={index}>
                <Card>
                    <Card.Header title="Asset Health Chart"> <Icon name="settings"/></Card.Header>
                    <Card.Content>
                        <Chart title="Chart 1" height="655">
                            <Chart.Line name="Temperature" data={this.state.plot1} color="#e01616"/>
                            <Chart.Line name="Humidity" data={this.state.plot2} color="#1e87d8"/>
                        </Chart>
                        {item.content}
                    </Card.Content>
                </Card>
            </Grid.Column>
        )
    }
    
    render() {
        const { sidebarCollapsed, items, settingsCollapsed, details } = this.state;
        return (
            <section className="page-example-wrap">
                <Header title="Asset Health Analyzer"  onMenuToggle={() => this.onCollapsedClick()} active={sidebarCollapsed}>
		            <Button type="primary" content="Refresh" onClick={() => this.changeGraph()} />
                    <Header.Item href="#">
                        <Icon size="large" root="building" name="user" />
                    </Header.Item>
                    <Header.IconItem icon={<Icon name="settings" root="common" />} description="Settings" />
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
                                <Grid.Column width={12}>
                                    <div style={{marginTop: '5em'}}><h1>Asset Dashboard</h1></div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={8} mOrder={3} sOrder={1} >
                                    <Card>
                                    <Card.Header title='Select Assets'> <Icon name="badge-info"/></Card.Header>
                                        <Card.Content>
                                        </Card.Content>
                                        <Card.Footer>
                                            <Icon root="common" name="caret-right" className="right"/>
                                        </Card.Footer>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={4} mOrder={1} sOrder={3}>
                                    <Card>
                                        <Card.Header title='Add Events'> <Icon name="badge-info"/></Card.Header>
                                        <Card.Content>
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
                                    <Card.Header title="Show Faults"> <Icon name="badge-info"/></Card.Header>
                                    <Card.Content>
                                    </Card.Content>
                                    <Card.Footer>
                                        <Icon root="common" name="caret-right" className="right"/>
                                    </Card.Footer>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={4} mOrder={2} sOrder={2}>
                                <Link to="/add-variables">
                                    <Card>
                                        <Card.Header title="Add Variables"> <Icon name="badge-info"/></Card.Header>
                                        <Card.Content>
                                        </Card.Content>
                                        <Card.Footer>
                                            <Icon root="common" name="caret-right" className="right"/>
                                        </Card.Footer>
                                    </Card>
                                </Link>
                            </Grid.Column>
                            <Grid.Column width={4} mOrder={2} sOrder={2}>
                                <Card>
                                    <Card.Header title="Add Rules"> <Icon name="badge-info"/></Card.Header>
                                    <Card.Content>
                                    </Card.Content>
                                    <Card.Footer>
                                        <Icon root="common" name="caret-right" className="right"/>
                                    </Card.Footer>
                                </Card>
                            </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                {items.map((item: any, index: any) => this.genCard(item, index))}
                            </Grid.Row>
                            <Grid.Row>
                                {details.map((item: any) => this.genTable(item))}
                            </Grid.Row>
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