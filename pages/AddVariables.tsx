import React from 'react';
import { Link } from 'react-router-dom';
import '@scuf/common/honeywell-compact-dark/theme.css';
import { Grid, SidebarLayout, Footer, Header, Icon, Button, Input, Breadcrumb, Badge } from '@scuf/common';

class AddVariables extends React.Component<{}, { [key: string]: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            settingsCollapsed: false,
            name: '',
            email: '',
            message: ''
        }
    }

    onCollapsedClick() {
        this.setState((prevState) => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
    }

    onSettingsCollapsedClick() {
        this.setState((prevState) => ({ settingsCollapsed: !prevState.settingsCollapsed }));
    }

    validate() {
        const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return {
            email: emailValidationRegex.test(this.state.email.trim()) ? null : 'Invalid Email',
            name: this.state.name.trim() ? null : 'Required',
            message: this.state.message.trim() ? null : 'Required'
        }
    }

    render() {
        const { sidebarCollapsed, settingsCollapsed } = this.state;
        const validation = this.validate();
        return (
            <section className="page-example-wrap new-test">
                <Header title="Form Template"  onMenuToggle={() => this.onCollapsedClick()}>
                    <Header.Item href="#">
                        <Icon size="large" root="building" name="user"/>
                    </Header.Item>
                    <Header.IconItem icon={<Icon name="settings" root="common" />} description="Settings" />
                </Header>
                <SidebarLayout collapsed={sidebarCollapsed} className="example-sidebar" >
                    <SidebarLayout.Sidebar>
                        <Link to="/">
                            <SidebarLayout.Sidebar.Item content="Home" icon="home" />
                        </Link>
                        <Link to="/dashboard">
                            <SidebarLayout.Sidebar.Item content="Dashboard" icon="grid"/>
                        </Link>
                        <SidebarLayout.Sidebar.BadgedItem content="Notifications" icon="notification" badge="2"/>
                        <SidebarLayout.Sidebar.Submenu content="Settings" icon="settings" 
                            open={settingsCollapsed}  
                            onClick={() => this.onSettingsCollapsedClick()}
                        >
                            <SidebarLayout.Sidebar.Item content="Power" icon="battery-mid"/>
                            <SidebarLayout.Sidebar.Item content="Tools" icon="tools" iconRoot="building" />
                        </SidebarLayout.Sidebar.Submenu>
                    </SidebarLayout.Sidebar>
                    <SidebarLayout.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Breadcrumb>
                                    <Breadcrumb.Item>
                                        <div style={{marginLeft: '1em', marginRight: '0.5em', paddingRight: '0.25rem', display: 'flex', alignItems: 'center'}}>
                                            <Icon name="grid" root="common" size="small"/>
                                        </div>
                                        <Link to="/dashboard">
                                            Dashboard
                                        </Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        Add Variables
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={9}>    
                                <Grid className="contact-us-area">
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <h1>Add Variables</h1>
                                        </Grid.Column>
                                    </Grid.Row>    
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            This form lets you enter the details of a new variable that you want to
                                            include in the Dasboard as a parameter. You need to enter the appropiate 
                                            details of the variable by making sure that such a parameter and it's values
                                            are valid and detected by your IoT devices. After submission of those details, 
                                            you can view the respective plots in the chart and perform suitable analysis.
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <h3>Default Variables</h3>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Badge color="red" empty />
                                            <div style={{ paddingLeft: 3 }}>Temperature</div>
                                        </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Badge color="yellow" empty />
                                            <div style={{ paddingLeft: 3 }}>Humidity</div>
                                        </div>
                                        </Grid.Column>
                                    </Grid.Row>                                                                   
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Input label="Variable Name" indicator="required" fluid={true} placeholder="Eg: Pressure" value={this.state.name} onChange={ value => this.setState({name: value}) }/>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Input label="Variable Type" indicator="required" fluid={true} placeholder="Eg: float"  value={this.state.email} onChange={ value => this.setState({email: value}) }/>
                                        </Grid.Column>
                                    </Grid.Row>                                                                  
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Input label="Variable Unit" indicator="required" fluid={true} placeholder="Eg: atm" value={this.state.message} onChange={ value => this.setState({message: value}) }/>
                                        </Grid.Column>
                                    </Grid.Row>                                                               
                                    <Grid.Row>
                                        <Grid.Column width={12} className="submit-button">
                                            <Button content="Submit" disabled={(validation.message || validation.email || validation.name) !== null}/>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>  
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Grid className="contact-us-resource-title">
                                    <Grid.Row>
                                        <h1>Resources</h1>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div style={{marginRight: '1em', display: 'flex', alignItems: 'center'}}>
                                            <Icon name="badge-info" root="building" exactSize={64} />
                                        </div>
                                        <br />
                                        Need Help? More Info.
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div style={{marginRight: '1em', display: 'flex', alignItems: 'center'}}>
                                            <Icon name="badge-warning" root="building" exactSize={64} />
                                        </div>
                                        <br />
                                        Unable to Submit?
                                    </Grid.Row>
                                    <Grid.Row >
                                        <div style={{marginRight: '1em', display: 'flex', alignItems: 'center'}}>
                                            <Icon name="tools" root="building" exactSize={64} />
                                        </div>
                                        <br />
                                        Fix It Yourself
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
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

export default AddVariables;