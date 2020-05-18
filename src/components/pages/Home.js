import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Button, Grid, Card, Container , Transition, Popup,Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Footer from './footer'
import { AuthContext } from '../../context/auth'
import moment from 'moment'
import LikeButton from '../LikeButton'
import DeleteButton from '../DeleteButton';
import { faComment,faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {

    const { user } = useContext(AuthContext)
    const { loading , data } = useQuery(GET_POSTS);  

    return (
      <div className="bg">
        <Container>
        <Grid textAlign="center">
            <Grid.Row>
                <h1>All Posts</h1><br/>
            </Grid.Row>
        </Grid>
                {loading ? (<h1>Post Loading...</h1>) : (
                  <Transition.Group>{
                    data.getPosts && data.getPosts.map((post) => (
                        <div key={post.id}>
                            <Card centered style={{width:"80%"}}>
                              <Card.Content>
                                <Image
                                  floated='right'
                                  size='mini'
                                  src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                                <Card.Header as={Link} to={`/users/${post.username}`}>{post.username}</Card.Header>
                                <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>
                                <b>{post.body}</b>
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                <div style={{textAlign:"center"}}>
                                <LikeButton user={user} post={post}/>

                                  <Button className="upload-icon" labelPosition='right' as={Link} to={`/posts/${post.id}`}>
                                  <FontAwesomeIcon className="icon-upload" icon={faComment} color="#38A1F3" size="lg"/>
                                  &nbsp;&nbsp;&nbsp;
                                  <span style={{marginTop:"3.5px"}}>
                                      {post.commentCount}
                                  </span>&nbsp;&nbsp;&nbsp;&nbsp;
                                  </Button>

                                  <Popup content="Share on twitter" trigger={
                                  <Button className="upload-icon" labelPosition='right'
                                  href={`https://twitter.com/intent/tweet?text=${post.body}`}>
                                  <FontAwesomeIcon className="icon-upload" icon={faShare} color="#38A1F3" size="lg"/>
                                  </Button>}/>&nbsp;&nbsp;&nbsp;&nbsp;

                                  {user && user.username === post.username && <DeleteButton postId={post.id} />}
                      </div>
                  </Card.Content>
                </Card><br/>
                        </div>
                    ))}</Transition.Group>
                )}
                
                <br/>
        </Container>
        <Footer/>
        </div>
        
    )
}

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
    likes{
      id 
      username
    }
    commentCount
    likeCount
  }
}
`;

export default Home;