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
  Breadcrumb,
} from "@scuf/common";

class SignUp extends React.Component<{}, { [key: string]: any }> {
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
            <Link to="/">
                <SidebarLayout.Sidebar.Item content="Home" icon="home" />
            </Link>
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
            <Breadcrumb>
                <Breadcrumb.Item>
                    <div style={{marginLeft: "1em", marginRight: "0.5em", paddingRight: "0.25rem", display: "flex", alignItems: "center"}}>
                        <Icon name="home" root="common" size="small" />
                    </div>
                    <Link to="/dashboard">Home</Link>
                </Breadcrumb.Item>
                 <Breadcrumb.Item>Create Account</Breadcrumb.Item>
            </Breadcrumb>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={9}>
                    <div style={{marginTop: "2em"}}>
                        <h1>Create your Account here</h1>
                    </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={9}>
                    <Card>
                        <Card.Content>
                        <Grid className="contact-us-area">
                            <Grid.Row>
                            <Grid.Column width={8}>
                                <h3>Sign Up</h3>
                            </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                            <Grid.Column width={8}>
                                <Input
                                label="Enter Your Email-Id"
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
                                label="Enter Username"
                                type="text"
                                indicator="required"
                                placeholder="enter username"
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
                            <Grid.Column width={8}>
                                <Input
                                label="Confirm Password"
                                type="password"
                                indicator="required"
                                placeholder="re-enter password"
                                fluid={true}
                                />
                            </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                            <Grid.Column width={4}>
                                <Button content="Sign-Up" />
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Link to="/">
                                <div
                                    style={{
                                    marginTop: "0.6em",
                                    display: "flex",
                                    alignItems: "center",
                                    }}
                                >
                                    <h4>Already have an account?</h4>
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

export default SignUp;