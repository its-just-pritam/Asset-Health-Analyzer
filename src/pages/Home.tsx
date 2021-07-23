import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Grid,
  Card,
  SidebarLayout,
  Footer,
  Header,
  Carousel
} from "@scuf/common";
let home1 = require("../images/home1.jpg");
let home2 = require("../images/home2.jpg");
let home3 = require("../images/home3.jpg");

class Home extends React.Component<{}, { [key: string]: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <section className="page-example-wrap">
           
            <Grid>
              <Grid.Row>
                    <Grid.Column width={10}>
                      <div style={{marginTop: '2em'}}><h1>
                        Why "Asset Health Analyzer" is the tool you need?
                      </h1></div>
                    </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={10}>
                  <Card>
                    <Card.Content>
                    <Carousel autoPlay={true} transitionTime={6000} height={700}>
                      <Carousel.Slide 
                          image={home1.default}
                          title="Complete end-to-end Basic Analysis Features"
                          subtitle="Data Analysis Models"
                          content="These models allows us to classify innacurate 
                          data points of the pre existing data and forecast the 
                          upcoming values as well as their faults. This way
                          the Analyzer keeps all tabs over the Asset functionalities 
                          and report them to the user ensuring easy maintenance."
                          buttonText="Learn More"
                          clickAction={() => {
                            return window.open('https://confluence.honeywell.com/display/ASTANLYZER/Frontend+Documentation', '_blank');
                          }}
                      />
                      <Carousel.Slide 
                          image={home2.default}
                          title="Keep track of performance from Customizable Dashboard"
                          subtitle="User-friendly Interface"
                          content="The dashboard will allow the user to view 
                          real-time data from the sensors of their industrial IoT 
                          devices, as well as some analytics such as its predicted 
                          correctness and live forecasted values. The user can also
                          download and view batch data while other functionalities
                          allows streaming of live data. The user needs to set up 
                          the Dashboard as a pre-requisite by seleting assets and variable(s)."
                      />
                      <Carousel.Slide 
                          image={home3.default}
                          title="Easily predict Faults and impending Anomalies"
                          subtitle="Major Event Popups"
                          content="Machine Learning Models are used to report 
                          possible faulty data from industrial IoT sensors and 
                          provides alerts to the user for such detected anomalies.​
                          However the user can also set up custom rules which appears
                          as a lower and upper plot line in the chart, ensuring
                          data points lying within the band are valid."
                      />
                    </Carousel>
                    </Card.Content>
                  </Card>
                  <div style={{marginBottom: '2em'}}></div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            
            
      </section>
    );
  }
}

export default Home;