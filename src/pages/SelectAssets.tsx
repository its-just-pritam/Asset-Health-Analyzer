import React from "react";
import { Link } from "react-router-dom";
import "@scuf/common/honeywell-compact-dark/theme.css";
import {
  Grid,
  SidebarLayout,
  Footer,
  Header,
  Icon,
  Button,
  Breadcrumb,
  Select,
  Card,
} from "@scuf/common";

class SelectAssets extends React.Component<{}, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      varOptions: [
        { value: "Fridge", text: "Refrigirator" },
        { value: "WM", text: "Washing Machine" },
        { value: "AC", text: "Air Conditioner" },
      ],
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
    const { sidebarCollapsed, settingsCollapsed, varOptions } = this.state;
    return (
      <section className="page-example-wrap new-test">
        <Header
          title="Form Template"
          onMenuToggle={() => this.onCollapsedClick()}
        >
          <Header.Item href="#">
            <Icon size="large" root="building" name="user" />
          </Header.Item>
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
              <SidebarLayout.Sidebar.Item
                content="Tools"
                icon="tools"
                iconRoot="building"
              />
            </SidebarLayout.Sidebar.Submenu>
          </SidebarLayout.Sidebar>
          <SidebarLayout.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <div
                        style={{
                          marginLeft: "1em",
                          marginRight: "0.5em",
                          paddingRight: "0.25rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Icon name="grid" root="common" size="small" />
                      </div>
                      <Link to="/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Select Asset</Breadcrumb.Item>
                  </Breadcrumb>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={9}>
                  <Grid className="contact-us-area">
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <h1>Select Asset</h1>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        This form lets you select an asset under your holding whose 
                        performance and reports are supposed to be viewed and analyzed on your
                        customized dashboard. The various parameters and its values transmitted 
                        by the IoT devices are filtered based on useful information, analyzed
                        using Machine Learning Models and the resulting statistics are plotted
                        on the charts.
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Card>
                        <Card.Content>
                          <Grid>
                          <Grid.Row>
                                <Grid.Column width={8}>
                                    <h3 style={{marginTop: '1em'}}>Select an asset you want to analyse</h3>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Select
                                  placeholder="Pick an Asset"
                                  options={varOptions}
                                  multiple={false}
                                  fluid={true}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <div style={{ marginTop: "15em" }}></div>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Button content="Lock" />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Grid className="contact-us-resource-title">
                    <Grid.Row>
                      <h1>Resources</h1>
                    </Grid.Row>
                    <Grid.Row>
                      <div
                        style={{
                          marginRight: "1em",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="badge-info"
                          root="building"
                          exactSize={64}
                        />
                      </div>
                      <br />
                      Need Help? More Info.
                    </Grid.Row>
                    <Grid.Row>
                      <div
                        style={{
                          marginRight: "1em",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="badge-warning"
                          root="building"
                          exactSize={64}
                        />
                      </div>
                      <br />
                      Unable to Submit?
                    </Grid.Row>
                    <Grid.Row>
                      <div
                        style={{
                          marginRight: "1em",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
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
    );
  }
}

export default SelectAssets;