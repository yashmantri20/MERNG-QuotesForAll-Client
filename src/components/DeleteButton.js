import React, {useState} from 'react'
import gql from 'graphql-tag';
import {useMutation } from '@apollo/react-hooks'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button , Confirm} from 'semantic-ui-react'

function DeleteButton({postId , commentId, callback}) {

    const [confirm,setConfirm] = useState(false)

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePostOrComment] = useMutation(mutation,{
    update(proxy)
    {   
        setConfirm(false);
        if(!commentId){
            const data = proxy.readQuery({
                query: GET_POSTS
            })
            data.getPosts = data.getPosts.filter(post => post.id !== postId )
            proxy.writeQuery({
                query: GET_POSTS,
                data
            });
    
        }
        if(callback) callback();
    },
    variables: {
        postId,
        commentId
    }
    })

    return (
        <>
            <Button className="upload-icon" labelPosition="right" as='div' onClick={() => setConfirm(true)}>
            <FontAwesomeIcon className="icon-upload" icon={faTrash} size="lg"/>
            </Button>
            <Confirm
            open={confirm}
            onCancel={() => setConfirm(false)}
            onConfirm={deletePostOrComment}/>
        </>
    )
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const GET_POSTS = gql `
{
  getPosts{
    id
    body
    username
    createdAt
    comments{
      id
      createdAt
      body
    }
    commentCount
    likeCount
  }
}
`;

const DELETE_COMMENT = gql`
mutation deletecomment($postId: ID!,$commentId: ID!){
    deletecomment(postId: $postId,commentId: $commentId){
        id
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
export default DeleteButton
