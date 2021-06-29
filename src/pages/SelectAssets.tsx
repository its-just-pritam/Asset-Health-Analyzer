import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Icon,
  Button,
  Breadcrumb,
  Select,
  Card,
} from "@scuf/common";
import { getPointsData, storageDataAssets } from "../components/storage";

class SelectAssets extends React.Component<{}, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      entry: {},
      varOptions: [{
        "value": 0,
        "text": "---Select an Asset---"
    }]
    };
  }

  async componentDidMount() {
    let ops = await getPointsData();
    let newOps: { value: string; text: string; }[] = [];

    for( let i in ops ) {
      let elem = {
        value: ops[i].text,
        text: ops[i].text
      };
      // console.log(elem);
      newOps.push(elem);
    }
    await this.setState(() => ({ varOptions: newOps }));
    console.log(this.state.varOptions);
  }

  async loadOptions(Callback: any) {
    let ops = await Callback();
    return ops;
  }

  async updateEntries(value: any) {
    let newVal = {
      devid: value
    };
    await this.setState(() => ({ entry: newVal }));
    console.log(this.state.entry);
  }

  async setAssets()
  {
    localStorage.setItem('assets', JSON.stringify(this.state.entry));
    let assets = localStorage.getItem('assets');
    console.log(JSON.parse(assets!));
    window.location.href = "/dashboard";
  }

  render() {
    const { varOptions } = this.state;
    return (
      <section className="page-example-wrap new-test">
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
                        customized dashboard. These assets are identified by pointID within the data
                        received from the IoT devices. The various parameters and its values transmitted 
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
                                  defaultValue = {storageDataAssets()}
                                  onChange = {(value: any) => this.updateEntries(value)}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <div style={{ marginTop: "15em" }}></div>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Button content="Lock" onClick={ () => this.setAssets() } />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Card.Content>
                      </Card>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
      </section>
    );
  }
}

export default SelectAssets;