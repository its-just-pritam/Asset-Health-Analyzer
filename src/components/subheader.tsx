import { useState, useEffect } from 'react';
import { Header } from "@scuf/common";
import { Link } from "react-router-dom";
import { userManager } from "../routes";
import { User, UserManager } from 'oidc-client';

export default function SubHeader() {
    const userData = useUser(userManager)?.profile!;
    console.log(userData);
    let fname = userData?.given_name;
    let lname = userData?.family_name;
    let jobID = userData?.preferred_username;
    let avatar = userData?.avatar;

    return (
        <Header.UserProfile firstName={fname!} lastName={lname!} role="Demolitions" imageUrl={avatar!}>
            <Header.UserProfile.Item disabled={true}>{fname} {lname}</Header.UserProfile.Item>
            <Header.UserProfile.Item disabled={true}>{jobID}</Header.UserProfile.Item>
            <Header.UserProfile.Item>User Profile</Header.UserProfile.Item>
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