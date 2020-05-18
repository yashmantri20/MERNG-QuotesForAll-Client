import React ,{useContext,useState} from 'react'
import { Form , Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {AuthContext} from '../../context/auth'
import Loading from '../Loading'

function Register(props) {
    const context = useContext(AuthContext)
    const [errors,setErrors] = useState({});
    const [values,setvalues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onChange = (e) => {
        setvalues({...values , [e.target.name] : e.target.value})
    }

    const [addUser , {loading}] = useMutation(REGISTER_USER,{
        update(_,result){
            context.login(result.data.register)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables : values
    })

    const onSubmit = (e) => {
        e.preventDefault();
        addUser();

    }

    return (
        <div className="bg" style={{marginTop:"-14px"}}>
        <div className="form">
            <br/>
        <Form onSubmit={onSubmit} noValidate>
            <p style={{color:"white"}}><b>Username :</b></p>
            <Form.Input
                placeholder = "Username"
                name = "username"
                type="text"
                error= {errors.username ? true : false}
                value = {values.username}
                onChange={onChange}/>

            <p style={{color:"white"}}><b>Email :</b></p>
            <Form.Input
                placeholder = "Email"
                name = "email"
                type="email"
                error= {errors.email ? true : false}
                value = {values.email}
                onChange={onChange}/>
            
            <p style={{color:"white"}}><b>Password :</b></p>
            <Form.Input
                placeholder = "Password"
                name = "password"
                type="password"
                error= {errors.password ? true : false}
                value = {values.password}
                onChange={onChange}/>

            <p style={{color:"white"}}><b>confirm Password :</b></p>
            <Form.Input
                placeholder = "Confirm Password"
                name = "confirmPassword"
                type="password"
                error= {errors.confirmPassword ? true : false}
                value = {values.confirmPassword}
                onChange={onChange}/>
            <center>
            <Button type="submit" primary>{loading && <Loading/>}Register</Button></center>
        </Form>
        {Object.keys(errors).length > 0 && (
             <div className="ui error message">
             <ul className="list">
                 {Object.values(errors).map(value => (
                      <li key={value}>{value}</li>
                 ))}
             </ul>
         </div>
        )}
        </div></div>
    )
}

const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  )
  {
    register(registerInput:{
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
    })
    {
        id
        email
        username
        createdAt
        token
    }
  }

`;

export default Register;
