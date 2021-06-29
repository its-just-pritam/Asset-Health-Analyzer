import { useSSOClient } from "@forge/sso-client/dist";
import { Card, Grid } from "@scuf/common";
import React from "react";

export default function UserComponent() {

    const { user } = useSSOClient();
    const userName = user?.profile.name;
    const company = user?.profile.customer;
    const avatar = user?.profile.avatar;
    const jobID = user?.profile.preferred_username;

    return (
        <Card>
            <Card.Content>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h3 style={{ marginTop: "1em" }}>
                                Profile Image
                            </h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <img src={avatar} alt="Avatar" height="200px" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h3 style={{ marginTop: "1em" }}>
                                Username : {userName}
                            </h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h3 style={{ marginTop: "1em" }}>
                                Company : {company}
                            </h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h3 style={{ marginTop: "1em" }}>
                                Job ID : {jobID}
                            </h3>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Content>
        </Card>
    );

}