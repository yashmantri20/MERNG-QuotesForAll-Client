import React , {useContext,useEffect} from 'react'
import {AuthContext} from '../../context/auth'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Button, Card, Container,Popup, Image} from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton'
import DeleteButton from '../DeleteButton';
import { faComment,faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Followers from './Followers'

function SingleUser(props) {
    const {user} = useContext(AuthContext)
    const { loading , data} = useQuery(GET_POSTS);

    const username =  props.match.params.username;
    const { data:dataR } = useQuery(FETCH_FOLLOWERS,{
      variables:{
        username
    }
    });
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    return (
        <div className="bg" style={{marginTop:"-14px"}}>
        <Container>
            <br/>
            <Card.Group>
                <Card centered style={{width:"80%"}}>
                  <Card.Content >
                    <Image
                      floated='right'
                      size='mini'
                      src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                    />
                    <Card.Header>{props.match.params.username}</Card.Header>
                    <Card.Meta>User</Card.Meta>
                    <Card.Description>
                    <div className='ui buttons'>
                    {dataR &&
                        <center><Followers user={user} data={dataR.getFollowers}/></center>}
                    </div>
                    </Card.Description>
                  </Card.Content>
                </Card>
                </Card.Group>
            <br/>
              {loading ? (<h1>Post Loading...</h1>) : (
                  data.getPosts && data.getPosts.map((post) => (
                      post.username === props.match.params.username ? 
                      <div key={post.id}>
                          <Card.Group>
                          <Card centered style={{width:"80%"}}>
                              <Card.Content>
                                <Image
                                  floated='right'
                                  size='mini'
                                  src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                                <Card.Header>{post.username}</Card.Header>
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
                </Card>
                </Card.Group>
                      <br/>
                  </div> : ''   
                  ))
              )}
      </Container>
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

const FETCH_FOLLOWERS = gql`
  query getFollowers($username: String!)
  {
      getFollowers(username: $username)
      {
        username
        followers{
          username
        }
        following{
          username
        }
        followCount
        followingCount
      }
  }
`;

export default SingleUser
