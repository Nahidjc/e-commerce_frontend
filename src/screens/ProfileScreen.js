import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserDetails, login, register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const ProfileScreen = () => {
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const history = useNavigate();
    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    useEffect(() => {
        if (!userInfo) {
            history('/login')

        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, history, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password) {
            if (password !== confirmPassword) {
                setMessage("Passwords do not match")
            }
        }



    }
    return (
        <div>
            <Row>
                <Col md={6} xs={8} lg="5">
                    <FormContainer>
                        <h1>User Profile</h1>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <div className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}> <Bars color="#00BFFF" height={80} width={80} /></div>}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                    placeholder='Enter Your Name'

                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    required
                                    type='email'
                                    readOnly
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    placeholder='Enter Email'

                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control

                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                    placeholder='Password'

                                >

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control

                                    type='password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}

                                    placeholder='Confirm Password'

                                >

                                </Form.Control>
                            </Form.Group>
                            <br />
                            <Button type='submit' variant="primary">Update</Button>
                        </Form>

                    </FormContainer>
                </Col>
                <Col md={6}>
                </Col>
            </Row>

        </div>
    );
};

export default ProfileScreen;