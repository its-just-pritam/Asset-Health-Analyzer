import React from "react";
import { Link } from "react-router-dom";
import "@scuf/common/honeywell-compact-dark/theme.css";
import {
  Grid,
  Card,
  SidebarLayout,
  Footer,
  Header,
  Icon,
  Button,
  Input,
} from "@scuf/common";

class Home extends React.Component<{}, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      settingsCollapsed: false,
    };
  }

  onCollapsedClick() {
    this.setState((prevState) => ({
      sidebarCollapsed: !prevState.sidebarCollapsed,
    }));
  }

  onSettingsCollapsedClick() {
    this.setState((prevState) => ({
      settingsCollapsed: !prevState.settingsCollapsed,
    }));
  }

  render() {
    const { sidebarCollapsed, settingsCollapsed } = this.state;
    return (
      <section className="page-example-wrap">
        <Header
          title="Asset Health Analyzer"
          onMenuToggle={() => this.onCollapsedClick()}
          active={sidebarCollapsed}
        >
          <Header.IconItem
            icon={<Icon name="settings" root="common" />}
            description="Settings"
          />
        </Header>
        <SidebarLayout collapsed={sidebarCollapsed} className="example-sidebar">
          <SidebarLayout.Sidebar>
            <SidebarLayout.Sidebar.Item
              content="Home"
              active={true}
              icon="home"
            />
            <Link to="/dashboard">
              <SidebarLayout.Sidebar.Item content="Dashboard" icon="grid" />
            </Link>
            <SidebarLayout.Sidebar.BadgedItem
              content="Notifications"
              icon="notification"
              badge="2"
            />
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
                    <Grid.Column width={9}>
                    <div style={{marginTop: '2em'}}><h1>Log-In to your Account here</h1></div>
                    </Grid.Column>
            </Grid.Row>
              <Grid.Row>
                <Grid.Column width={9}>
                  <Card>
                    <Card.Content>
                      <Grid className="contact-us-area">
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <h3>Sign In</h3>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <Input
                              label="Enter Email-Id"
                              type="email"
                              indicator="required"
                              placeholder="example@honeywell.com"
                              fluid={true}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <Input
                              label="Enter Password"
                              type="password"
                              indicator="required"
                              placeholder="enter password"
                              fluid={true}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={4}>
                            <Button content="Login" />
                          </Grid.Column>
                          <Grid.Column width={4}>
                    
                            <Link to="/signup">
                            <div style={{marginTop: '0.6em', display: 'flex', alignItems: 'center'}}>
                                <h4>Create Account</h4>
                            </div>
                            </Link>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Card.Content>
                    <Card.Footer>
                      <Icon
                        root="common"
                        name="caret-right"
                        className="right"
                      />
                    </Card.Footer>
                  </Card>
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
    );
  }
}

export default Home;