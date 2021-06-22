import { useState, useEffect } from 'react';
import { Card, Header } from "@scuf/common";
import { Link } from "react-router-dom";
import { userManager } from "../routes";
import { User, UserManager } from 'oidc-client';

export default function SubHeader() {
    const userData = useUser(userManager)?.profile!;
    let fname = userData?.given_name;
    let lname = userData?.family_name;
    let jobID = userData?.preferred_username;
    let avatar = userData?.avatar;
    // console.log(userData);

    return (
        <Header.UserProfile firstName={fname!} lastName={lname!} role="Demolitions" imageUrl={avatar!}>
            <Card>
                <Card.Content>
                    <div>{fname} {lname}</div>
                    <br/>
                    <div>{jobID}</div>
                </Card.Content>
            </Card>
            <Header.UserProfile.Item>
                <Link to="/user-profile" style={{ textDecoration: 'none' }}>
                    User Profile
                </Link>
            </Header.UserProfile.Item>
            <Header.UserProfile.Item>
                <Link to="/logout" style={{ textDecoration: 'none' }}>
                    Log Out
                </Link>
            </Header.UserProfile.Item>
        </Header.UserProfile>
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