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
import { getParamsData, storageDataParams } from "../components/storage";

class UpdateVariables extends React.Component<{}, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      entries: {},
      varOptions: []
    };
  }

  async componentDidMount() {
    let ops = await getParamsData();
    let newOps: { value: string; text: string; }[] = [];

    for( let i in ops ) {
      let elem = {
        value: ops[i],
        text: ops[i].charAt(0).toUpperCase() + ops[i].slice(1)
      };
      // console.log(elem);
      newOps.push(elem);
    }
    await this.setState(() => ({ varOptions: newOps }));
    console.log(this.state.varOptions);
  }
  
  async updateEntries(value: any) {
    let tempVal = value.filter(function(value: any, index: any, arr: any){ 
      return value !== "Select a variable!";
  });
    let newVal = {
      params: tempVal
    };
    await this.setState(() => ({ entries: newVal }));
    console.log(this.state.entries);
  }

  async setParams()
  {
    localStorage.setItem('parameters', JSON.stringify(this.state.entries));

    let params = localStorage.getItem('parameters');
    console.log("Final params in storage:");
    console.log(JSON.parse(params!));
    console.log(JSON.parse(params!).params);
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
                    <Breadcrumb.Item>Update Variables</Breadcrumb.Item>
                  </Breadcrumb>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={9}>
                  <Grid className="contact-us-area">
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <h1>Update Variables</h1>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        This form lets you enter multiple variable(s) which you want to
                        include in the Dasboard as a parameter. You need to enter the appropiate 
                        variable by making sure that such a parameter and it's values
                        are valid and detected by your IoT devices. After submission of those details, 
                        you can view the respective plots in the chart and perform suitable analysis.

                        You can also enter the details of a variable that
                        you want to remove from the Dasboard as a parameter that
                        are already being displayed. After submission,
                        you can view that it will be filtered out in our plots.
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Card>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <h3 style={{ marginTop: "1em" }}>
                                  Select the variables you want to update
                                </h3>
                              </Grid.Column>
                            </Grid.Row>
                            
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Select
                                  options={varOptions}
                                  multiple={true}
                                  fluid={true}
                                  defaultValue = {storageDataParams()}
                                  onChange = {(value: any) => this.updateEntries(value)}
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <div style={{ marginTop: "15em" }}></div>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Button content="Update" onClick={ () => this.setParams() } />
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

export default UpdateVariables;
