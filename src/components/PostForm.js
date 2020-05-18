import React , {useState } from 'react'
import { Form , Button, TextArea} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

function PostForm(props) {

    // const [errors,setErrors] = useState({});
    const [values,setvalues] = useState({
       body: ""
    })

    const onChange = (e) => {
        setvalues({...values , [e.target.name] : e.target.value})
    }

    const [createPost , {error}] = useMutation(CREATE_POST,{
        variables : values,
        update(proxy,result){
            const data = proxy.readQuery({
                query: GET_POSTS
            })
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({
                query: GET_POSTS,
                data
            });
            values.body = '';
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPost();
          } catch (e) {
            console.error(e);
          }
        

    }

    return (
        <>
        <div style={{textAlign:"center",width:"100%"}}>
        <Form onSubmit={onSubmit} noValidate>
            <Form.Field>
            <TextArea
                style={{resize:"none"}}
                rows={8}
                placeholder = "Hello world"
                name = "body"
                type="text"
                value = {values.body}
                error = {error ? true : false}
                onChange={onChange}/></Form.Field>
            <br/>
            <Button color="teal" type="submit">Share</Button>
            <br/>
            
            
        </Form>
        {error &&(
            <div className="ui error message">
                <li>{error.graphQLErrors[0].message}</li>
            </div>
        )}
        &nbsp;
        </div>
        </>
    )
}

const CREATE_POST = gql`
mutation createPost(
    $body: String!
  )
  {
    createPost(
        body: $body
    )
    {
        id
        username
        createdAt
        body
        likes{
            id
            username
            createdAt
        }
        likeCount
        comments{
            id
            username
            createdAt
        }
        commentCount
    }
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


export default PostForm
