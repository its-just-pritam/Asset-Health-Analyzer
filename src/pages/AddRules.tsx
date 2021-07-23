import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Grid,
  Icon,
  Button,
  Breadcrumb,
  Card,
  Input,
} from "@scuf/common";
import {  storageDataParams, storageDataRules } from "../components/storage";
import { useSSOClient } from "@forge/sso-client/dist";

export default function AddRules(props: any) {

    const { user } = useSSOClient();
    const token = user?.access_token!;

    if(user === null || ( new Date(1000 * (user.expires_at)) <= new Date() ))
      return (
        <Redirect to={{ pathname: "/login" }} />
      );
    else
      return (
        <AddRulesClass token={token} />
      );
}


export class AddRulesClass extends React.Component<{ [key: string]: any }, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      params: storageDataParams(),
      entry: storageDataRules()
    };
  }

  async setRules()
  {
    let storageValue = {
        limits: this.state.entry
    }
    localStorage.setItem('rules', JSON.stringify(storageValue));
    console.log(storageDataRules());
    window.location.href = "/dashboard";
  }

  showSelect(item: any, index: any) {

    if( item === "Select a variable!" )
     return (<h4 style={{margin: "4em 0 0 0"}}>
       Dashboard setup is not complete! <br/>
       Please update variable(s) before setting rules.
     </h4>);

    let variablename = item.charAt(0).toUpperCase() + item.slice(1);
    let defaultLowLim = ( this.state.entry[`${item}`] === undefined || this.state.entry[`${item}`][0] === null )? null : this.state.entry[`${item}`][0];
    let defaultUpLim = ( this.state.entry[`${item}`] === undefined || this.state.entry[`${item}`][1] === null )? null : this.state.entry[`${item}`][1];
    console.log(this.state.entry);

        return (
          <div style={{width: "100%", margin: "1em 0 3em 0.5em"}}>
              <h3>
                  {variablename}:
              </h3>
              <Input type="number" value={defaultLowLim} label="Lower Bound" min={0} onChange={(value: any) => {
                  let tempEntry = this.state.entry;
                  tempEntry[`${item}`][0] = parseFloat(value);
                  this.setState(() => ({ entry: tempEntry }))
              }} /> 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Input type="number" value={defaultUpLim} label="Upper Bound" min={0} onChange={(value: any) => {
                  let tempEntry = this.state.entry;
                  tempEntry[`${item}`][1] = parseFloat(value);
                  this.setState(() => ({ entry: tempEntry }))
              }} />
          </div>
        );
  }

  generateButton() {
    if( this.state.params[0] === "Select a variable!" )
      return;
    else
      return (
        <Button content="Save" onClick={() => this.setRules()} />
      );
  }

  render() {
    const { params, disabledButton } = this.state;
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
                    <Breadcrumb.Item>Add Rules</Breadcrumb.Item>
                  </Breadcrumb>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={11}>
                  <Grid className="contact-us-area">
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <h1>Add Rules</h1>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <p>
                          This form lets you define upper and lower bounds (limits) which
                          will further dictate whether the data points in the chart correspond
                          to faulty data or not. According to the user's notation, the values
                          entered in the form will act as horiozontal lines in the plot.
                        </p>
                        <p>
                          <b>NOTE:</b> The data points between the upper and lower bound define
                          valid points. <br/>
                          Make sure the values entered should satisfy this condition: &nbsp;
                          <i>Lower Bound &lt;= Upper Bound</i>
                        </p>
                        <p>
                          To remove a bound from the chart: &nbsp;
                          <i>Clear the value in the corresponding input and SAVE</i>
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Card>
                        <Card.Content>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={11}>
                                { params.map((item: any, index: any) => this.showSelect(item, index)) }
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <div style={{ marginTop: "15em" }}></div>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={11}>
                                <div style={{marginTop: "2em"}} >
                                    { this.generateButton() }
                                </div>
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
            <div style={{height: "300px"}} />
      </section>
    );
  }
}