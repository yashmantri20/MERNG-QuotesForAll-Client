import React, {useEffect , useState} from 'react'
import gql from 'graphql-tag';
import {Button , Icon , Label} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {useMutation } from '@apollo/react-hooks'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function CommentButton({user , post}) {

    const [commentOnPost] = useMutation(COMMENT_ON_POST, {
        variables: {postId: post.id,body},
    });

    const likeButton = user ? (
            < FontAwesomeIcon className="icon-upload" icon={faHeart} color="red" size="lg"/>
        ) : (
        < FontAwesomeIcon as={Link} to="/login" className="icon-upload" icon={faHeart}  color="gray" size="lg"/>
      )
      
    return(
        <Button as='div' className="upload-icon" labelPosition='right' onClick={likePost}>
        {likeButton}&nbsp;&nbsp;&nbsp;
        <span basic color='red' style={{marginTop:"3.5px"}}>
            {post.likeCount}
        </span>&nbsp;&nbsp;&nbsp;&nbsp;
        </Button>
    )
}

const COMMENT_ON_POST = gql`
    mutation createcomment($postId: ID!,$body: String!){
        createcomment(postId: $postId,body: $body)
        {
            id
            body
            createdAt
            username
            comments{
            id
            username
            createdAt
            body
            }
            commentCount
        }
    }
`;


export default CommentButton