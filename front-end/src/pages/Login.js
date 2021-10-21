import Container from 'react-bootstrap/Container';
import CustomButton from '../components/CustomButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import firebase from "firebase/app";
import React, { useContext, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';

import { auth } from '../firebase';
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';
import './../styles/App.css';
import FullPageLoading from '../components/FullPageLoading';
import { UserContext } from '../providers/UserProvider';

// Return custom error messaging based on Firebase Auth errors: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
function getErrorMessage(errorCode) {
    if (errorCode === 'auth/invalid-email') {
        return '😴 Please enter a valid email'
    } else if (errorCode === 'auth/user-disabled') {
        return 'Login failed: This username has been disabled. If you believe this to be a mistake then contact the site admin.'
    } else if (errorCode === 'auth/user-not-found') {
        return '😳 Login failed: Invalid username'
    } else if (errorCode === 'auth/wrong-password') {
        return '😢 Login failed: Invalid password'
    } else {
        return '😬 There was an unknown error while signing you in. Please try again'
    }
}

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const history = useHistory();
    let location = useLocation();

    const submitHandler = event => {
        event.preventDefault();
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            auth.signInWithEmailAndPassword(username, password).then((authCredentials) => {
                setErrorCode('');
                setLoading(true);
                // we only arrive in this code block if the user successfully logged in
                // however the userContext which is used by the rest of the application (including AdminRouter)
                // can take a second to update with these credentials, thus we enforce an artifical 1s loading
                // to ensure that the credentials have a chance to propagate throughout the rest of the application
                setTimeout(() => {
                    console.log('Welcome ' + authCredentials.user.email + ' 😎');
                    setLoading(false);
                    history.push('/admin/profile');
                }, 1000);
            }).catch((error) => {
                setErrorCode(error.code);
                console.error(error);
            })
        }).catch((error) => {
            setErrorCode(error.code);
            console.log("Error setting auth persistence: " + error.message);
        })
    }

    // if the user is actually already logged in then we can redirect them to the admin portal!
    // check to see if there is a redirectRoute in the state (i.e. did the AdminRouter first redirect to the login page because the user wasn't authenticated within the delay timer)
    // otherwise by default send the user to the profile page
    if(user != null) {
        history.replace(location.state != null ? location.state.redirectRoute : '/admin/profile');
    }

    return (
        <div className="background-accent">
            <FullPageLoading loading={loading} />
            <div className="login-wrapper">
                <Container>
                    <Row>
                        <Col>
                            <Card className="pt-4">
                                <Card.Header className="card-header-no-border"><h2 className="font-weight-bold">Organization Login</h2></Card.Header>
                                <Card.Body className="pt-3 mx-3">
                                    {errorCode !== '' && <h6 className="text-danger">{getErrorMessage(errorCode)}</h6>}
                                    {location.state != null && errorCode === '' && location.state.displayError ? <h6 className="text-danger">It appears you are not logged in yet!</h6> : null}
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="email">
                                            <Form.Control className="py-4" required onChange={(event) => setUsername(event.target.value)} value={username} type="email" placeholder="Email address" />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Control className="py-4" onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Row>
                                            <Col>
                                                <CustomButton type="submit" className="drop-shadow py-2" wide>Login</CustomButton>
                                            </Col>
                                            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Link to="/password-reset-email" style={{ textAlign: 'center' }}>Forgot password?</Link>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="mt-3">
                                                <p className="main-text">Don't have an account yet? </p>
                                                <Link to="/new-org-signup" style={{ textAlign: 'center' }}>Sign Up!</Link>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-center py-5" xs={{ order: 'first' }} md={{ order: 'last' }}>
                            <Link to="/">
                                <ECSLogo />
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}