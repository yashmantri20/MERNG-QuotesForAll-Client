import React,{useContext, useState , useEffect , useRef} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Button, Card , Form,Popup, Container} from 'semantic-ui-react'
import { AuthContext } from '../../context/auth'
import moment from 'moment'
import LikeButton from '../LikeButton'
import DeleteButton from '../DeleteButton'
import { faComment , faShare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SinglePost(props) {
    const {user} = useContext(AuthContext)
    const [comment,setComment] = useState("")
    const inputRef = useRef(null)

    const postId = props.match.params.postId
    const { data } = useQuery(FETCH_QUERY,{
        variables:{
            postId
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    const [createcomment] = useMutation(CREATE_COMMENT,{
        update(){
            inputRef.current.blur()
            setComment("");
        },
        variables:{
            postId,
            body: comment
        }
    })

    function deleteCallback(){
        props.history.push('/')
    }

    let postMarkup;
    if(!data){
        postMarkup = <p style={{backgroundColor:"white"}}>Loading...</p>
    }
    else{
        const {id,body,createdAt,username,comments,likes,likeCount,commentCount} = data.getPost;
        postMarkup = (
            <Container>
                <Card color="black" fluid style={{width:"100%"}} >
                          <Card.Content textAlign="center">
                          <Card.Header>{username}</Card.Header>
                          <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                          <Card.Description>
                          <b>{ body }</b>
                          </Card.Description>
                        </Card.Content>
                        <Card.Content textAlign="center" extra>

                            <LikeButton user={user} post={{ id,likeCount,likes }}/>

                            <Button as='div' className="upload-icon" labelPosition='right'>
                            <FontAwesomeIcon className="icon-upload" icon={faComment} color="#38A1F3" size="lg"/>
                            &nbsp;&nbsp;&nbsp;
                            <span style={{marginTop:"3.5px"}}>
                                {commentCount}
                            </span>&nbsp;&nbsp;&nbsp;&nbsp;
                            </Button>
                        
                            <Popup content="Share on twitter" trigger={
                          <Button className="upload-icon" labelPosition='right'
                           href={`https://twitter.com/intent/tweet?text=${body}`}>
                            <FontAwesomeIcon className="icon-upload" icon={faShare} color="#38A1F3" size="lg"/>
                          </Button>}/>&nbsp;&nbsp;&nbsp;&nbsp;

                        {user && user.username === username && <DeleteButton postId={id} callback={deleteCallback}/>}
                        </Card.Content>
                        {user && (
                                <Card.Content textAlign="center" >
                                <b>Post a Comment</b>
                                
                                <Form>
                                <br/>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment"
                                            name="comment"
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                            ref={inputRef}
                                        />
                                        <button 
                                            type="submit" className="ui button teal"
                                            disabled = {comment.trim() === ''}
                                            onClick = {createcomment}>Comment
                                        </button>

                                    </div>
                                </Form>
                                </Card.Content>
                        )}
                      </Card>

                        <center><b style={{fontSize:"30px",color:"white"}}>Comments</b></center>
                        { comments.length >= 1 &&
                        <Card centered style={{width:"100%"}}>
                        {comments.map(comment => (
                                <Card.Content key={comment.id} textAlign="center" style={{backgroundColor:"lightgrey"}}>
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description><br/>
                                    <Card.Description>{user && user.username === comment.username && <DeleteButton postId={id} commentId={comment.id}/>}</Card.Description>
                                </Card.Content>
                      ))}</Card>}
            </Container>
            
        )
    }
    return(
        <div className="bg" style={{marginTop:"-14px",minHeight:"100vh"}}>
                <br/>
                {postMarkup}
                <br/>
        </div>
    )  
}

const FETCH_QUERY = gql`
    query getPost($postId: ID!)
    {
        getPost(postId: $postId)
        {
            id
            body
            username
            createdAt
            comments{
            id
            createdAt
            username
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

const CREATE_COMMENT = gql`
mutation createcomment($postId: ID!,$body: String!)
  {
      createcomment(postId: $postId,body: $body){
          id
          comments{
              id
              username
              body
              createdAt
          }
          commentCount
      }
  }
`;
export default SinglePost
