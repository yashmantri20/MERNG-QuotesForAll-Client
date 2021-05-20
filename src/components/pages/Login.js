import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../../context/auth'
import Loading from '../Loading'

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});
    const [values, setvalues] = useState({
        username: "",
        password: "",
    })

    const onChange = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    const [loginGuest, load] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {
            username: "Guest",
            password: "Test@12345",
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
        loginUser();
    }

    return (
        <div className="bg" style={{ marginTop: "-14px" }}>
            <div className="form">
                <br />
                <Form onSubmit={onSubmit} noValidate>
                    <p style={{ color: "white" }}><b>Username :</b></p>
                    <Form.Input
                        placeholder="Username"
                        name="username"
                        type="text"
                        error={errors.username ? true : false}
                        value={values.username}
                        onChange={onChange} />

                    <p style={{ color: "white" }}><b>Password :</b></p>
                    <Form.Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        error={errors.password ? true : false}
                        value={values.password}
                        onChange={onChange} />

                    <center>
                        <Button type="submit" primary> {loading && <Loading />} Login</Button>
                    </center>
                </Form>
                <div className='guest-login'>
                    <Button type="submit" primary style={{ marginTop: '15px' }} onClick={loginGuest}> {load.loading && <Loading />} Login With Guest Account</Button>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div >

    )
}

const LOGIN_USER = gql`
mutation login(
    $username: String!
    $password: String!
  )
  {
    login(
        username: $username
        password: $password
    )
    {
        id
        email
        username
        createdAt
        token
    }
  }

`;

export default Login;