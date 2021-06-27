import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  SidebarLayout,
  Footer,
  Header,
  Carousel
} from "@scuf/common";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
let home1 = require("../images/home1.jpg");
let home2 = require("../images/home2.jpg");
let home3 = require("../images/home3.jpg");

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
                          data points and forecast the upcoming values. The Analyzer 
                          keeps all tabs over the Asset functionalities and report
                          them to the user ensuring easy maintenance."
                          buttonText="Learn More"
                          clickAction={() => alert('Learn More')}
                      />
                      <Carousel.Slide 
                          image={home2.default}
                          title="Keep track of performance from Customizable Dashboard"
                          subtitle="User-friendly Interface"
                          content="The dashboard will allow the user to view 
                          real-time data from the sensors of their industrial IoT 
                          devices, as well as some analytics such as its predicted 
                          correctness and live forecasted values"
                      />
                      <Carousel.Slide 
                          image={home3.default}
                          title="Easily predict Faults and impending Anomalies"
                          subtitle="Major Event Popups"
                          content="Machine Learning Models are used to report 
                          possible faulty data from industrial IoT sensors and 
                          provides alerts to the user for such detected anomalies.​"
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