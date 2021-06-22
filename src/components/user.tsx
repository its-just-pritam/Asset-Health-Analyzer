import { useState, useEffect } from 'react';
import { Button, Card, Grid } from "@scuf/common";
import { Link } from "react-router-dom";
import { userManager } from "../routes";
import { User, UserManager } from 'oidc-client';

export default function ProfileData() {
    const userData = useUser(userManager)?.profile!;
    let fname = userData?.given_name;
    let lname = userData?.family_name;
    let jobID = userData?.preferred_username;
    let avatar = userData?.avatar;
    let email = fname?.toLocaleLowerCase() + "." + lname?.toLocaleLowerCase() + "@honeywell.com";
    let company = userData?.customer;

    return (
          <Card>
          <Card.Content>
              <Grid>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <h3 style={{marginTop: '1em'}}>Profile Picture</h3>
                      </Grid.Column>
                  </Grid.Row>                                                               
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <img src={avatar} height='200px' alt="Avatar"/>
                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <h3>Name : {fname} {lname}</h3>
                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <h3>Employee ID : {jobID}</h3>
                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <h3>Email ID : {email}</h3>
                      </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <h3>Employee @ {company}</h3>
                      </Grid.Column>
                  </Grid.Row>        
                  <Grid.Row>
                    <Grid.Column>
                      <div style={{marginTop: "1em"}}></div>
                    </Grid.Column>
                  </Grid.Row>                                                       
                  <Grid.Row>
                      <Grid.Column width={8}>
                        <Link to="/">
                          <Button content="Save" />
                        </Link>
                      </Grid.Column>
                  </Grid.Row>  
              </Grid>
          </Card.Content>
      </Card>
    );
}

function useUser(userManager: UserManager): User | undefined {
    const [user, setUser] = useState<User>();
    useEffect(() => {
      userManager
        .getUser()
        .then((u) => {
          if (u) {
            setUser(u);
          }
        })
        .catch((e) => {
          console.log('Error in accessing user data : ' + e);
        });
        
      const onUserLoaded = (user: User) => setUser(user);
      userManager.events.addUserLoaded(onUserLoaded);
      return () => userManager.events.removeUserLoaded(onUserLoaded);
    }, [userManager]);

    return user;
  }