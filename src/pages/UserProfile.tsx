import React from 'react';
import { Link } from 'react-router-dom';
import '@scuf/common/honeywell-compact-dark/theme.css';
import SubHeader from '../components/subheader'
import { Grid, SidebarLayout, Footer, Header } from '@scuf/common';
import ProfileData from '../components/user';

class UserProfile extends React.Component<{}, { [key: string]: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            varOptions: [ 
                { value: 'Degree Celcius', text: 'Temperature' }, 
                { value: 'Percentage', text:'Humidity' }, 
                { value:'Atmosphere', text:'Pressure'}
            ],
            sidebarCollapsed: false,
            settingsCollapsed: false,
        }
    }

    onCollapsedClick() {
        this.setState((prevState) => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
    }

    onSettingsCollapsedClick() {
        this.setState((prevState) => ({ settingsCollapsed: !prevState.settingsCollapsed }));
    }

    render() {
        const { sidebarCollapsed, settingsCollapsed } = this.state;
        return (
            <section className="page-example-wrap new-test">
                <Header title="Asset Health Analyzer"  onMenuToggle={() => this.onCollapsedClick()}>
                    <SubHeader />
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
                            <Grid.Column width={9}>    
                                <Grid className="contact-us-area">
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <h1 style={{marginTop: '1em'}}>User Profile</h1>
                                        </Grid.Column>
                                    </Grid.Row>    
                                    <Grid.Row>
                                        <ProfileData />
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

export default UserProfile;