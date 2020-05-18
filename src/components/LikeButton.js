import React, {useEffect , useState} from 'react'
import gql from 'graphql-tag';
import {Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {useMutation } from '@apollo/react-hooks'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function LikeButton({user ,post: {id,likeCount,likes}}) {

    const [liked , setLiked] = useState(false);

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username))
        {
            setLiked(true)
        }
        else{
            setLiked(false)
        }
    },[user,likes])

    const [likePost] = useMutation(LIKE_POST, {
        variables: {postId: id},
        onError(err){
            alert("Please login to like the post")
        },
    });

    const likeButton = user ? (
        liked ? (
            < FontAwesomeIcon className="icon-upload" icon={faHeart} color="red" size="lg"/>
        ) : ( 
            < FontAwesomeIcon className="icon-upload" icon={faHeart} color="gray" size="lg" />
      )) : (
        < FontAwesomeIcon as={Link} to="/login" className="icon-upload" icon={faHeart}  color="gray" size="lg"/>
      )
      
    return(
        <>
        <Button as='div' className="upload-icon" labelPosition='right' onClick={likePost}>
        {likeButton}&nbsp;&nbsp;&nbsp;
        <span color='red' style={{marginTop:"3.5px"}}>
            {likeCount}
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
        </Button>
        {/* {Object.keys(errors).length > 0} */} 
       </>
    )
}

const LIKE_POST = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId)
        {
            id 
            likes{
                id 
                username
            }
            likeCount
        }
    }
`;


export default LikeButton