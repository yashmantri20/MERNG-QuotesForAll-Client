import React, {useEffect , useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';


function Followers({user, data : {username,followers,followCount,followingCount}}) {
    const [follows , setFollower] = useState(false);

    useEffect(() => {
        if(user && followers.find(follower => follower.username === user.username))
        {
            setFollower(true)
        }
        else{
            setFollower(false)
        }
    },[user,followers])

    const [follow] = useMutation(FOLLOW_USER, {
        variables: {username: username},
        update(){
            
            if(follows === false){
                setFollower(true)
                window.location.href = "https://quotes-for-all.netlify.app/"
            }
            else{
                setFollower(false)
                window.location.href = "https://quotes-for-all.netlify.app/"
            }   
        },
        onError(err){
            alert("Please login to follow")
        },
    });

    const followbutton =  user && user.username !== username ? (
        follows ? (
            "Unfollow"
        ) : ( 
            "Follow"
      )) : ""

    return(
        <div style={{marginTop:"0px"}}>
        <h4 style={{color:"black",fontSize:"15px"}}>
            Followers : {followCount}&nbsp;&nbsp;&nbsp;&nbsp;
            Following : {followingCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            { followbutton !== "" &&
            <Button primary onClick={follow}>
        {followbutton}&nbsp;&nbsp;&nbsp;
        </Button>}
        </h4>
       </div>
    )
}

const FOLLOW_USER = gql`
    mutation follow($username: String!){
      follow(username: $username){
        following{
      username
    }
    followers{
      username
    }
    followCount
    followingCount
      }
    }
`;

export default Followers
