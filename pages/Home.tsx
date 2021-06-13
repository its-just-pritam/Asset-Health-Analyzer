import React from 'react';
import { Link } from 'react-router-dom';
import '@scuf/common/honeywell-compact-dark/theme.css';
import { Grid, Card, SidebarLayout, Footer, Header, Icon, Button, Table } from '@scuf/common';

class Home extends React.Component<{}, { [key: string]: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
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
            <section className="page-example-wrap">
                <Header title="Asset Health Analyzer"  onMenuToggle={() => this.onCollapsedClick()} active={sidebarCollapsed}>
                    <Header.Item href="#">
                        <Icon size="large" root="building" name="user" />
                    </Header.Item>
                    <Header.IconItem icon={<Icon name="settings" root="common" />} description="Settings" />
                </Header>
                <SidebarLayout collapsed={sidebarCollapsed} className="example-sidebar">
                <SidebarLayout.Sidebar>
                        <SidebarLayout.Sidebar.Item content="Home" active={true} icon="home" />
                        <Link to="/dashboard">
                            <SidebarLayout.Sidebar.Item content="Dashboard" icon="grid"/>
                        </Link>
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

export default Home;