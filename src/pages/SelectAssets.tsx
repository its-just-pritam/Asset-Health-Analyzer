import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Grid,
  Icon,
  Button,
  Breadcrumb,
  Select,
  Card,
} from "@scuf/common";
import { getPointsData, storageDataAssets } from "../components/storage";
import { useSSOClient } from "@forge/sso-client/dist";

export default function SelectAssets(props: any) {

    const { user } = useSSOClient();
    const token = user?.access_token!;

    if(user === null || ( new Date(1000 * (user.expires_at)) <= new Date() ))
      return (
        <Redirect to={{ pathname: "/login" }} />
      );
    else
      return (
        <SelectAssetsClass token={token} />
      );
}


class SelectAssetsClass extends React.Component<{ [key: string]: any }, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      token: this.props.token,
      disabledButton: true,
      entry: {},
      varOptions: [{
        "value": "---Select an Asset---",
        "text": "---Select an Asset---",
        "point": 0
    }]
    };
  }

  async componentDidMount() {
    
    let ops = await getPointsData(this.state.token);
    let newOps: { value: string; text: string; point: number }[] = [];

    for( let i in ops ) {
      let elem = {
        value: ops[i].dev,
        text: ops[i].dev,
        point: ops[i].point
      };
      // console.log(elem);
      newOps.push(elem);
    }
    await this.setState(() => ({ varOptions: newOps }));
    await this.setState(() => ({ isLoading: false }));
    console.log(this.state.varOptions);
  }

  async loadOptions(Callback: any) {
    let ops = await Callback();
    return ops;
  }

  async updateEntries(value: any) {

    await this.setState(() => ({ disabledButton : false }));
    let pointID;
    this.state.varOptions.map((item: any) => {
      if( item.value === value )
        pointID = item.point;
      return 0;
    });

    let newVal = {
      devid: value,
      pointid: pointID
    };
    await this.setState(() => ({ entry: newVal }));
    console.log(this.state.entry);
  }

  async setAssets()
  {
    localStorage.setItem('assets', JSON.stringify(this.state.entry));
    localStorage.removeItem('parameters');
    localStorage.removeItem('rules');

    console.log(storageDataAssets());
    window.location.href = "/dashboard";
  }

  showSelect() {
    
    if( this.state.isLoading )
        return (
          <div style={{margin: "1em 0"}}>
              <Icon name="refresh" size="medium" loading={this.state.isLoading}/>
              Loading available devices...
          </div>
        );
    else
        return (
          <Select
              placeholder="Pick an Asset"
              options={this.state.varOptions}
              multiple={false}
              fluid={true}
              defaultValue = {storageDataAssets()}
              onChange = {(value: any) => this.updateEntries(value)}
          />
        );
  }

  render() {
    const { disabledButton } = this.state;
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
                                { this.showSelect() }
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <div style={{ marginTop: "15em" }}></div>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Button content="Lock" onClick={ () => this.setAssets() } disabled={disabledButton} />
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